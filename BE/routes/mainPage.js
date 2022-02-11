const express = require("express");
const fs = require("fs");
const schedule = require("node-schedule");
const router = express.Router();

const { pool } = require("../utils/mysql");
const { logger } = require("../utils/winston");
const { verifyToken } = require("../utils/jwt");
const { count } = require("console");
const today = new Date();

// 매일 업데이트 되는 sum.txt 파일
schedule.scheduleJob("0 0 0 * * *", async function () {
  console.log("schedule");
  const total = await pool.query(`SELECT SUM(count) as last_total FROM hospital_survey`);
  try {
    fs.writeFile("data/sum.txt", `${total[0][0].last_total}`, (err) => {
      if (err) console.log("err : " + err);
    });
    logger.info("Update Total Count Success");
  } catch (error) {
    logger.error("Update Total Count Fail " + error);
  }
});
// schedule.scheduleJob("10 * * * * *", function () {
//   console.log("매 10초에 실행");
// });

/*----------------------------------------------------------------------*
 * GET Main Detail
 * Example URL = ../main
 *----------------------------------------------------------------------*/
router.get("/main/:hospital_id", async (req, res) => {
  const hospital_id = req.params.hospital_id;

  // const date = `'${today.getFullYear()}-${("0" + today.getMonth() + 1).slice(-2)}-${(
  //   "0" +
  //   (today.getDate() + 1)
  // ).slice(-2)}'`;
  // const date = new Date(+new Date() + 3240 * 10000)
  //   .toISOString()
  //   .replace("T", " ")
  //   .replace(/\..*/, "");
  // const date = new Date();
  // console.log(date);
  try {
    const available_eventCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_event WHERE start_at <= now() AND end_at > now()`
    );
    const available_surveyCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_survey WHERE start_at <= now() AND end_at > now()`
    );

    const available_MyeventCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_event WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now()`
    );
    const available_MysurveyCnt = await pool.query(
      `SELECT COUNT(id) AS cnt FROM hospital_survey WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now()`
    );

    const totalVote = await pool.query(
      `SELECT SUM(count) AS cnt FROM hospital_survey WHERE start_at <= now()`
    );
    if (totalVote[0][0].cnt == null) {
      totalVote[0][0].cnt = 0;
    }

    const totalMyVote = await pool.query(
      `SELECT SUM(count) AS cnt FROM hospital_survey WHERE hospital_id = ${hospital_id} AND start_at <= now()`
    );
    if (totalMyVote[0][0].cnt == null) {
      totalMyVote[0][0].cnt = 0;
    }

    const lastVote = fs.readFileSync("data/sum.txt", "utf-8");
    const todayVote = totalVote[0][0].cnt - lastVote;

    const result_Mysurvey = await pool.query(
      `select r.age , r.gender  from survey_result r join hospital_survey s on r.survey_id = s.id where s.hospital_id = ${hospital_id};`
    );

    const populartVotes = await pool.query(
      `SELECT id, title, count FROM hospital_survey WHERE hospital_id = ${hospital_id} AND start_at <= now() AND end_at > now() ORDER BY count DESC`
    );

    const result = {
      available_eventCnt: available_eventCnt[0][0].cnt,
      available_surveyCnt: available_surveyCnt[0][0].cnt,
      available_MyeventCnt: available_MyeventCnt[0][0].cnt,
      available_MysurveyCnt: available_MysurveyCnt[0][0].cnt,
      totalVote: totalVote[0][0].cnt,
      totalMyVote: totalMyVote[0][0].cnt,
      todayVote: todayVote,
      result_Mysurvey: result_Mysurvey[0],
      populartVotes: populartVotes[0],
    };

    logger.info("GET Main Success");
    res.send(result);
  } catch (error) {
    logger.error("GET Main Fail" + error);
    return res.json(error);
  }
});

module.exports = router;
