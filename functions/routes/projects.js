const express = require("express");
const router = express.Router();
const Projects = require("../database/daos/projects");


router.get("/", async (req, res) => {
  try {
    const item = await Projects.getAll();
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Projects.getById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Projects.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const item = await Projects.update(req.params.id, req.body);
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Projects.del(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;