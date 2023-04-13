const express = require("express");
const router = express.Router();
const Deck = require("../models/decksModel");
const auth = require("../middleware/auth");

router.get("/auth", auth.verifyAuth, async function (req, res, next) {
  try {
    console.log("Get decks");
    let result = await Deck.getDecks();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/ChoosenDeck", auth.verifyAuth, async function (req, res, next) {
  try {
    console.log("Get decks");
    let result = await Deck.getDeckchoosen(req.game);
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.patch('/play', auth.verifyAuth, async function (req, res, next) {
  try {
      console.log("Play card with id: ",req.body.cardid);
      if (!req.game || req.game.opponents.length == 0) {
          res.status(400).send({msg:"Your are not in a game or are still waiting for another player."});
      } 
      let result = await Deck.playCard(req.game,req.body.cardid);
      res.status(result.status).send(result.result);
  } catch (err) {
      console.log(err);
      res.status(500).send(err);
  }
});

module.exports = router;
