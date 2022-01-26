const express = require("express");
const { pool } = require("../../utils/mysql");
const { logger } = require("../../utils/winston");
const router = express.Router();

// 설문 생성 version 1 for문 사용

router.post("/survey/:hospital_id", async (req, res) => {
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
    const LAST_INSERT_ID = `SELECT LAST_INSERT_ID() as auto_id;`;
    const surveyID_data = await pool.query(LAST_INSERT_ID);
    const surveyID = surveyID_data[0][0].auto_id;
    console.log(surveyID);
    let question_sql = ``;
    let option_sql = ``;
    let benchmark_sql = ``;

    for (i = 0; i < question.length; i++) {
      question_sql =
        "INSERT INTO question ( survey_id, `order`, context, type ) VALUES(?, ?, ?, ?);";
      await pool.query(question_sql, [
        surveyID,
        question[i].order,
        question[i].context,
        question[i].type,
      ]);
      let questionID_data = await pool.query(LAST_INSERT_ID);
      let questionID = questionID_data[0][0].auto_id;
      if (question[i].type == 1) continue;
      for (j = 0; j < question[i].option.length; j++) {
        option_sql =
          "INSERT INTO `option` ( question_id, `order`, context, weight ) VALUES(?, ?, ?, ?);";
        await pool.query(option_sql, [
          questionID,
          question[i].option[j].order,
          question[i].option[j].context,
          question[i].option[j].weight,
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
router.put("/survey/:id", async (req, res) => {
  const id = req.params.id;
  const { category, title, context, output_link, start_at, end_at, question, benchmark } = req.body;
  try {
    if (req.body.end_at) {
      const survey_sql = `UPDATE hospital_survey SET category=?, title=?, context=?, output_link=?, start_at=?, end_at=? WHERE id = ?;`;
      await pool.query(survey_sql, [category, title, context, output_link, start_at, end_at, id]);
    } else {
      const survey_sql = `UPDATE hospital_survey SET category=?, title=?, context=?, output_link=?, start_at=? WHERE id = ?;`;
      await pool.query(survey_sql, [category, title, context, output_link, start_at, id]);
    }
    // const LAST_INSERT_ID = `SELECT LAST_INSERT_ID() as auto_id;`;
    // const surveyID_data = await pool.query(LAST_INSERT_ID);
    // const surveyID = surveyID_data[0][0].auto_id;
    // console.log(surveyID);
    let question_sql = ``;
    let option_sql = ``;
    let benchmark_sql = ``;

    for (i = 0; i < question.length; i++) {
      question_sql = "UPDATE question SET `order`=?, context=?, type=? WHERE id = ?;";
      await pool.query(question_sql, [
        question[i].order,
        question[i].context,
        question[i].type,
        question[i].id,
      ]);
      // let questionID_data = await pool.query(LAST_INSERT_ID);
      // let questionID = questionID_data[0][0].auto_id;
      if (question[i].type == 1) continue;
      for (j = 0; j < question[i].option.length; j++) {
        option_sql = "UPDATE `option` SET `order`=?, context=?, weight=? WHERE id = ?;";
        await pool.query(option_sql, [
          question[i].option[j].order,
          question[i].option[j].context,
          question[i].option[j].weight,
          question[i].option[j].id,
        ]);
      }
    }
    for (i = 0; i < benchmark.length; i++) {
      benchmark_sql = "UPDATE benchmark SET benchmark=?, output_text=? WHERE id = ?;";
      await pool.query(benchmark_sql, [
        benchmark[i].benchmark,
        benchmark[i].output_text,
        benchmark[i].id,
      ]);
    }

    logger.info("[INFO] POST /survey/update");
    return res.json({ result: "ok", surveyID: id });
  } catch (error) {
    logger.error("POST /insert Error" + error);
    return res.json(error);
  }
});

// // survey update.
// router.put("/survey/:id", async (req, res) => {
//   const id = req.params.id;
//   const { title, context, output_link, start_at, end_at } = req.body;
//   try {
//     if (req.body.end_at) {
//       const sql = `UPDATE hospital_survey SET title=?, context=?, output_link=?, start_at=?, end_at=? WHERE id = ?;`;
//       const data = await pool.query(sql, [title, context, output_link, start_at, end_at, id]);
//     } else {
//       const sql = `UPDATE hospital_survey SET title=?, context=?, output_link=?, start_at=? WHERE id = ?;`;
//       const data = await pool.query(sql, [title, context, output_link, start_at, id]);
//     }
//     logger.info("[INFO] PUT /survey/update");
//     return res.json({ result: "ok" });
//   } catch (error) {
//     logger.error("POST /update Error" + error);
//     return res.json(error);
//   }
// });

// survey delete
router.delete("/survey/:id", async (req, res) => {
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
    console.log(question_data[0]);
    if (question_data[0].length == 0)
      option_sql = "select * from `option` where question_id in (-1);";
    const option_data = await pool.query(option_sql);

    const benchmark_sql = "SELECT * FROM benchmark WHERE survey_id = ?;";
    const benchmark_data = await pool.query(benchmark_sql, [id]);
    // console.log(survey_data[0]);
    // console.log(question_data[0]);
    // console.log(option_data[0]);
    // console.log(benchmark_data[0]);

    // v2.(문제 : option_dataset 낭비)
    // let option_dataset = [];
    // for (i = 0; i < option_data[0].length; i++) {
    //   if (option_dataset[option_data[0][i].question_id])
    //     option_dataset[option_data[0][i].question_id].push(option_data[0][i]);
    //   else option_dataset[option_data[0][i].question_id] = [option_data[0][i]];
    //   // option_dataset[n] = [...option_dataset[n], option_data[0][i]];
    // }

    // let question_dataset = [];
    // for (i = 0; i < question_data[0].length; i++) {
    //   question_dataset[i] = question_data[0][i];
    //   question_dataset[i].option = option_dataset[question_data[0][i].id];
    // }

    // v3
    if (question_data[0].length != 0) {
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

    // v1.(문제 : 주 객관식 구분 불가능)
    // let question_dataset = [];
    // for (i = 0; i < question_data[0].length; i++) {
    //   question_dataset[i] = question_data[0][i];
    // }
    // console.log(question_dataset[0].context);
    // console.log(question_dataset);
    // let n = 0;
    // let qid = option_data[0][0].question_id;
    // let option_dataset = [];
    // for (i = 0; i < option_data[0].length; i++) {
    //   if (qid != option_data[0][i].question_id) {
    //     question_dataset[n].option = option_dataset[n];
    //     qid = option_data[0][i].question_id;
    //     n++;
    //   }
    //   if (option_dataset[n]) option_dataset[n].push(option_data[0][i]);
    //   else option_dataset[n] = [option_data[0][i]];
    //   // option_dataset[n] = [...option_dataset[n], option_data[0][i]];
    // }
    // question_dataset[n].option = option_dataset[n];

    // console.log(question_dataset);
    // console.log(question_dataset[0].option);

    // for (i = 0; i < question_data[0].length; i++){
    //   for (j = question_data[0][i].) {
    //     question_dataset = [{ question_data[0][i], [option_data[0][j]] }]
    //   }
    // }
    // const question_data2 = [
    //   [
    //     question_data[0][i],
    //     [
    //       option_data[0][j],
    //       option_data[0][j],
    //       option_data[0][j],
    //       option_data[0][j],
    //       option_data[0][j],
    //     ],
    //   ],
    //   [{}, [{}, {}, {}, {}, {}]],
    //   [{}, [{}, {}, {}, {}, {}]],
    //   [{}, [{}, {}, {}, {}, {}]],
    // ];

    const result = survey_dataset;
    // console.log(option_sql);

    logger.info("[INFO] GET /survey/detail");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

// survey Detail
// router.get("/survey/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     const sql = `SELECT * FROM hospital_survey WHERE ID = ?;`;
//     const data = await pool.query(sql, [id]);
//     const result = data[0];

//     logger.info("[INFO] GET /survey/detail");
//     return res.json(result);
//   } catch (error) {
//     logger.error("GET /select Error" + error);
//     return res.json(error);
//   }
// });

// survey list
router.get("/survey/list/:hospital_id", async (req, res) => {
  try {
    const hospital_id = req.params.hospital_id;
    // const { page } = req.query;
    const sql = `SELECT * FROM hospital_survey WHERE hospital_id=?;`;
    const data = await pool.query(sql, [hospital_id]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /survey/list");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

router.get("/survey/list/:hospital_id/:category", async (req, res) => {
  try {
    const hospital_id = req.params.hospital_id;
    const category = req.params.category;
    // const { page } = req.query;
    const sql = `SELECT * FROM hospital_survey WHERE hospital_id=? and category=?;`;
    const data = await pool.query(sql, [hospital_id, category]);
    // const result = data[0].slice((page - 1) * 10, page * 10);
    const result = data[0];
    logger.info("[INFO] GET /survey/list/:hospital_id/:category");
    return res.json(result);
  } catch (error) {
    logger.error("GET /select Error" + error);
    return res.json(error);
  }
});

module.exports = router;
