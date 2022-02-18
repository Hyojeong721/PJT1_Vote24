const express = require("express");
const fs = require("fs");
const schedule = require("node-schedule");
const router = express.Router();

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { verifyToken } = require("../utils/jwt");
const { count } = require("console");
const today = new Date();

// 매일 업데이트 되는 sum.txt 파일 v2
schedule.scheduleJob("0 0 0 * * *", async function () {
  try {
    const hospital_cnt = await pool.query(`SELECT id FROM hospital_info;`);
    for (i = 0; i < hospital_cnt[0].length; i++) {
      const todayCnt = await pool.query(
        `SELECT sum(s.count) as today FROM hospital_survey s JOIN hospital_info i ON s.hospital_id = i.id WHERE i.id = ?;`,
        [hospital_cnt[0][i].id]
      );
      if (todayCnt[0][0].today == null) todayCnt[0][0].today = 0;
      await pool.query("UPDATE hospital_info SET todayCnt = ? WHERE id = ?", [
        todayCnt[0][0].today,
        hospital_cnt[0][i].id,
      ]);
    }
    logger.info("Update today Count Success");
  } catch (error) {
    logger.error("Update today Count Fail " + error);
  }
});
/*----------------------------------------------------------------------*
 * GET Main Detail
 * Example URL = ../main
 *----------------------------------------------------------------------*/
router.get("/main/:hospital_id", async (req, res) => {
  const hospital_id = req.params.hospital_id;
  try {
    // 진행중인 이벤트 수.
    const available_eventCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_event WHERE start_at <= now() AND end_at > now();`
    );
    // 진행중인 설문 수.
    const available_surveyCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_survey WHERE start_at <= now() AND end_at > now();`
    );
    // 진행중인 이벤트 수(해당 병원).
    const available_MyeventCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_event WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now();`
    );
    // 진행중인 설문 수(해당 병원).
    const available_MysurveyCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_survey WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now();`
    );
    // 전체 설문 참여 인원
    const totalVote = await pool.query(`SELECT SUM(count) AS cnt FROM hospital_survey;`);
    if (totalVote[0][0].cnt == null) {
      totalVote[0][0].cnt = 0;
    }
    // 해당 병원의 설문 참여 인원
    const totalMyVote = await pool.query(
      `SELECT SUM(count) AS cnt FROM hospital_survey WHERE hospital_id = ${hospital_id};`
    );
    if (totalMyVote[0][0].cnt == null) {
      totalMyVote[0][0].cnt = 0;
    }

    // 전체 설문 참여인원 (직전 일자.)
    const lastVote = await pool.query(`SELECT sum(todayCnt) as lastvote FROM hospital_info;`);

    // 해당 병원의 설문 참여인원 (직전 일자.)
    const lastMyVote = await pool.query(
      `SELECT todayCnt FROM hospital_info WHERE id = ${hospital_id};`
    );

    // 현재까지 설문 참여 인원 - 어제까지의 설문 참여 인원(전체)
    const todayVote = totalVote[0][0].cnt - lastVote[0][0].lastvote;
    // 현재까지 설문 참여 인원 - 어제까지의 설문 참여 인원(해당 병원)
    const todayMyVote = totalMyVote[0][0].cnt - lastMyVote[0][0].todayCnt;

    // // 설문 결과
    // const result_Mysurvey = await pool.query(
    //   `select r.age , r.gender  from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id};`
    // );

    // 인기순(참여순) 설문 리스트
    const popularVotes = await pool.query(
      `SELECT id, title, count FROM hospital_survey WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now() ORDER BY count DESC limit 5;` // 출력 5개
    );
    // 설문결과(나이 별 count)
    const result_Mysurvey_age = await pool.query(
      `select r.age, count(r.age) as count from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id} group by r.age order by age;`
    );

    let ageSet = [];

    for (i = 0; i < 6; i++) {
      ageSet[i] = { age: (i + 1) * 10, count: 0 };
    }

    for (i = 0; i < result_Mysurvey_age[0].length; i++) {
      ageSet[result_Mysurvey_age[0][i].age / 10 - 1] = {
        age: result_Mysurvey_age[0][i].age,
        count: result_Mysurvey_age[0][i].count,
      };
    }

    // 설문결과(남자-나이 별 count)
    const result_Mysurvey_man_age = await pool.query(
      `select r.age, count(r.age) as count from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id} and r.gender=0 group by r.age order by age;`
    );

    // 설문결과(여자-나이 별 count)
    const result_Mysurvey_woman_age = await pool.query(
      `select r.age, count(r.age) as count from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id} and r.gender=1 group by r.age order by age;`
    );

    // 설문결과(성별 count)
    const result_Mysurvey_gender = await pool.query(
      `select r.gender, count(r.gender) as count from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id} group by r.gender;`
    );

    const result = {
      available_eventCnt: available_eventCnt[0][0].cnt,
      available_surveyCnt: available_surveyCnt[0][0].cnt,
      available_MyeventCnt: available_MyeventCnt[0][0].cnt,
      available_MysurveyCnt: available_MysurveyCnt[0][0].cnt,
      totalVote: totalVote[0][0].cnt,
      totalMyVote: totalMyVote[0][0].cnt,
      todayVote: todayVote,
      todayMyVote: todayMyVote,
      // result_Mysurvey: result_Mysurvey[0],
      popularVotes: popularVotes[0],
      result_Mysurvey_age: ageSet,
      result_Mysurvey_man_age: result_Mysurvey_man_age[0],
      result_Mysurvey_woman_age: result_Mysurvey_woman_age[0],
      result_Mysurvey_gender: result_Mysurvey_gender[0],
    };

    logger.info("GET Main Success");
    res.send(result);
  } catch (error) {
    logger.error("GET Main Fail" + error);
    return res.json(error);
  }
});

module.exports = router;
