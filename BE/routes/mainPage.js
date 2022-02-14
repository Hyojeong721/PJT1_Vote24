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
// 매일 업데이트 되는 sum.txt 파일
// schedule.scheduleJob("0 0 0 * * *", async function () {
//   console.log("schedule");
//   const total = await pool.query(`SELECT SUM(count) as last_total FROM hospital_survey`);
//   try {
//     fs.writeFile("data/sum.txt", `${total[0][0].last_total}`, (err) => {
//       if (err) console.log("err : " + err);
//     });
//     logger.info("Update Total Count Success");
//   } catch (error) {
//     logger.error("Update Total Count Fail " + error);
//   }
// });
// schedule.scheduleJob("10 * * * * *", function () {
//   console.log("매 10초에 실행");
// });

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

    const result_Mysurvey = await pool.query(
      `select r.age , r.gender  from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id};`
    );

    const popularVotes = await pool.query(
      `SELECT id, title, count FROM hospital_survey WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now() ORDER BY count DESC;`
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
      result_Mysurvey: result_Mysurvey[0],
      popularVotes: popularVotes[0],
    };

    logger.info("GET Main Success");
    res.send(result);
  } catch (error) {
    logger.error("GET Main Fail" + error);
    return res.json(error);
  }
});

module.exports = router;
