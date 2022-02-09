const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const { verifyToken } = require("../../utils/jwt");
const router = express.Router();

// 설문 생성 version 1 for문 사용

router.post("/survey/:hospital_id", verifyToken, async (req, res) => {
  const hospital_id = req.params.hospital_id;
  const { category, title, context, output_link, start_at, end_at, question, benchmark } = req.body;
  try {
    if (req.body.end_at) {
      const survey_sql = `INSERT INTO hospital_survey ( hospital_id, category, title, context, output_link, start_at, end_at ) VALUES(?, ?, ?, ?, ?, ?, ?);`;
      await pool.query(survey_sql, [
        hospital_id,
        category,
        title,
        context,
        output_link,
        start_at,
        end_at,
      ]);
    } else {
      const survey_sql = `INSERT INTO hospital_survey ( hospital_id, category, title, context, output_link, start_at ) VALUES(?, ?, ?, ?, ?, ?);`;
      await pool.query(survey_sql, [hospital_id, category, title, context, output_link, start_at]);
    }
    const LAST_INSERT_ID = `SELECT MAX(id) as auto_id FROM hospital_survey;`;
    const surveyID_data = await pool.query(LAST_INSERT_ID);
    const surveyID = surveyID_data[0][0].auto_id;
    console.log(surveyID);
    let question_sql = ``;
    let option_sql = ``;
    let benchmark_sql = ``;

    const LAST_INSERT_ID_Q = `SELECT MAX(id) as auto_id FROM question;`;
    let questionID_data;
    let questionID;
    for (i = 0; i < question.length; i++) {
      question_sql =
        "INSERT INTO question ( survey_id, `order`, context, type ) VALUES(?, ?, ?, ?);";
      await pool.query(question_sql, [
        surveyID,
        question[i].order,
        question[i].context,
        question[i].type,
      ]);
      questionID_data = await pool.query(LAST_INSERT_ID_Q);
      questionID = questionID_data[0][0].auto_id;
      if (question[i].type == 1) continue;
      console.log(!question[i].option);
      if (!question[i].option) {
        // 디폴트 처리(그렇다., 아니다.)
        const option_yes_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_yes_sql, [questionID, 1, "그렇다.", 0]);
        const option_no_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_no_sql, [questionID, 2, "아니다.", 0]);
        continue;
      }
      for (j = 0; j < question[i].option.length; j++) {
        let weight = 0;
        if (question[i].option[j].weight) weight = question[i].option[j].weight;
        option_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_sql, [
          questionID,
          question[i].option[j].order,
          question[i].option[j].context,
          weight,
        ]);
      }
    }
    for (i = 0; i < benchmark.length; i++) {
      benchmark_sql =
        "INSERT INTO benchmark ( survey_id, benchmark, output_text ) VALUES(?, ?, ?);";
      await pool.query(benchmark_sql, [surveyID, benchmark[i].benchmark, benchmark[i].output_text]);
    }

    logger.info("[INFO] POST /survey/write");
    return res.json({ result: "ok", surveyID: surveyID });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// survey update.
router.put("/survey/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const { category, title, context, output_link, start_at, end_at, question, benchmark } = req.body;
  try {
    const hospital_id_data = await pool.query(
      "SELECT hospital_id FROM hospital_survey WHERE id = ?",
      [id]
    );
    console.log(hospital_id_data);
    const hospital_id = hospital_id_data[0][0].hospital_id;
    await pool.query("DELETE FROM hospital_survey WHERE id = ?", [id]);
    if (req.body.end_at) {
      const survey_sql = `INSERT INTO hospital_survey ( hospital_id, category, title, context, output_link, start_at, end_at ) VALUES(?, ?, ?, ?, ?, ?, ?);`;
      await pool.query(survey_sql, [
        hospital_id,
        category,
        title,
        context,
        output_link,
        start_at,
        end_at,
      ]);
    } else {
      const survey_sql = `INSERT INTO hospital_survey ( hospital_id, category, title, context, output_link, start_at ) VALUES(?, ?, ?, ?, ?, ?);`;
      await pool.query(survey_sql, [hospital_id, category, title, context, output_link, start_at]);
    }
    const LAST_INSERT_ID = `SELECT MAX(id) as auto_id FROM hospital_survey;`;
    const surveyID_data = await pool.query(LAST_INSERT_ID);
    const surveyID = surveyID_data[0][0].auto_id;
    console.log(surveyID);
    let question_sql = ``;
    let option_sql = ``;
    let benchmark_sql = ``;

    const LAST_INSERT_ID_Q = `SELECT MAX(id) as auto_id FROM question;`;
    let questionID_data;
    let questionID;
    for (i = 0; i < question.length; i++) {
      question_sql =
        "INSERT INTO question ( survey_id, `order`, context, type ) VALUES(?, ?, ?, ?);";
      await pool.query(question_sql, [
        surveyID,
        question[i].order,
        question[i].context,
        question[i].type,
      ]);
      questionID_data = await pool.query(LAST_INSERT_ID_Q);
      questionID = questionID_data[0][0].auto_id;
      if (question[i].type == 1) continue;
      console.log(!question[i].option);
      if (!question[i].option) {
        // 디폴트 처리(그렇다., 아니다.)
        const option_yes_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_yes_sql, [questionID, 1, "그렇다.", 0]);
        const option_no_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_no_sql, [questionID, 2, "아니다.", 0]);
        continue;
      }
      for (j = 0; j < question[i].option.length; j++) {
        let weight = 0;
        if (question[i].option[j].weight) weight = question[i].option[j].weight;
        option_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_sql, [
          questionID,
          question[i].option[j].order,
          question[i].option[j].context,
          weight,
        ]);
      }
    }
    for (i = 0; i < benchmark.length; i++) {
      benchmark_sql =
        "INSERT INTO benchmark ( survey_id, benchmark, output_text ) VALUES(?, ?, ?);";
      await pool.query(benchmark_sql, [surveyID, benchmark[i].benchmark, benchmark[i].output_text]);
    }

    logger.info("[INFO] PUT /survey/update");
    return res.json({ result: "ok", surveyID: surveyID });
  } catch (error) {
    logger.error("PUT /update Error" + error);
    return res.json(error);
  }
});

// survey delete
router.delete("/survey/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `DELETE FROM hospital_survey WHERE id=?;`;
    const data = await pool.query(sql, [id]);

    logger.info("[INFO] DELETE /survey/delete");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("GET /delete Error" + error);
    return res.json(error);
  }
});

// survey Detail
router.get("/survey/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const survey_sql = "SELECT * FROM hospital_survey WHERE ID = ?;";
    const survey_data = await pool.query(survey_sql, [id]);
    const question_sql = "SELECT * FROM question WHERE survey_id = ? order by `order`;";
    const question_data = await pool.query(question_sql, [id]);
    let option_sql = "select * from `option` where question_id in (";

    for (i = 0; i < question_data[0].length; i++) {
      option_sql += `${question_data[0][i].id}`;
      if (i == question_data[0].length - 1) option_sql += ")";
      else option_sql += ",";
    }
    // console.log(question_data[0]);
    if (question_data[0].length == 0)
      option_sql = "select * from `option` where question_id in (-1);";
    const option_data = await pool.query(option_sql);

    const benchmark_sql = "SELECT * FROM benchmark WHERE survey_id = ?;";
    const benchmark_data = await pool.query(benchmark_sql, [id]);
    console.log(option_data[0][0]);
    if (question_data[0].length != 0 && option_data[0] != 0) {
      let n = 0;
      let qid = option_data[0][0].question_id;
      let option_dataset = [];
      for (i = 0; i < option_data[0].length; i++) {
        if (qid != option_data[0][i].question_id) {
          qid = option_data[0][i].question_id;
          n++;
        }
        if (option_dataset[n]) option_dataset[n].push(option_data[0][i]);
        else option_dataset[n] = [option_data[0][i]];
      }
      let m = 0;
      let question_dataset = [];
      for (i = 0; i < question_data[0].length; i++) {
        question_dataset[i] = question_data[0][i];
        if (question_data[0][i].type == 0) {
          question_dataset[i].option = option_dataset[m];
          m++;
        }
      }
      survey_dataset = {
        ...survey_data[0][0],
        question: question_dataset,
        benchmark: benchmark_data[0],
      };
    } else {
      let option_dataset = [];
      let m = 0;
      let question_dataset = [];
      for (i = 0; i < question_data[0].length; i++) {
        question_dataset[i] = question_data[0][i];
        if (question_data[0][i].type == 0) {
          question_dataset[i].option = option_dataset[m];
          m++;
        }
      }
      survey_dataset = {
        ...survey_data[0][0],
        question: question_dataset,
        benchmark: benchmark_data[0],
      };
    }

    const result = survey_dataset;
    // console.log(option_sql);

    logger.info("[INFO] GET /survey/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// survey list all
router.get("/survey/list/:hospital_id", async (req, res) => {
  try {
    const hospital_id = req.params.hospital_id;
    const sql = `SELECT * FROM hospital_survey WHERE hospital_id=? order by end_at desc, created_at desc;`;
    const data = await pool.query(sql, [hospital_id]);
    let result = data[0];
    const now = new Date();
    for (i = 0; i < result.length; i++) {
      result[i].status = now < result[i].end_at;
    }
    console.log(result);
    logger.info("[INFO] GET /survey/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// survey list category
router.get("/survey/list/:hospital_id/:category", async (req, res) => {
  try {
    const hospital_id = req.params.hospital_id;
    const category = req.params.category;
    const sql = `SELECT * FROM hospital_survey WHERE hospital_id=? and category=? order by end_at desc, created_at desc;`;
    const data = await pool.query(sql, [hospital_id, category]);
    let result = data[0];
    const now = new Date();
    for (i = 0; i < result.length; i++) {
      result[i].status = now < result[i].end_at;
    }
    logger.info("[INFO] GET /survey/list/:hospital_id/:category");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// survey result
router.post("/survey/result/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { questions, score } = req.body;
    const survey_sql = `UPDATE hospital_survey SET count = count+1 WHERE id = ?;`;
    await pool.query(survey_sql, [id]);

    for (i = 0; i < questions.length; i++) {
      if (questions[i].select) {
        const sql = "UPDATE `option` SET count = count+1 WHERE id = ?;";
        await pool.query(sql, [questions[i].select]);
      } else {
        const sql = "INSERT INTO subjective_answer (question_id, answer) VALUES (?, ?);";
        await pool.query(sql, [questions[i].id, questions[i].answer]);
      }
    }
    const score_sql = "INSERT INTO score_sum (survey_id, score_sum) VALUES (?, ?);";
    await pool.query(score_sql, [id, score]);

    logger.info("[INFO] POST /survey/result/:id");
    return res.json({ result: "ok" });
  } catch (error) {
    logger.error("POST /result Error" + error);
    return res.json(error);
  }
});

module.exports = router;
