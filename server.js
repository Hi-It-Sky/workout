const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workouts";
const collections = ["excercise"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

/*
app.post("/submit", (req, res) => {
  console.log(req.body);

  db.excercise.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});
*/

/*
app.get("/all", (req, res) => {
  db.excercise.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});
*/

/*
app.get("/find/:id", (req, res) => {
  db.excercise.findOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});
*/

/*
app.post("/update/:id", (req, res) => {
  db.excercise.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        title: req.body.title,
        note: req.body.note,
        modified: Date.now()
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});
*/
/*
app.delete("/delete/:id", (req, res) => {
  db.excercise.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});
*/
/*
app.delete("/clearall", (req, res) => {
  db.excercise.remove({}, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send(response);
    }
  });
});
*/
app.listen(3000, () => {
  console.log("App running on port 3000!");
});

app.get("/exercise", (req, res) => {
      res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.workouts.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
});

app.put("/api/workouts/:id", (req, res) => {
  //create empty workout if appropriate
  console.log(req.body);
  console.log(req.params.id);
  console.log(mongojs.ObjectId(req.params.id));
  db.workouts.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
        $push: { exercises: req.body }
    },
    (error, data) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {

        console.log(data);
        res.send(data);
      }
    }
  );
});


app.post("/api/workouts", (req, res) => {
  db.workouts.insert( { "exercises" : [] } , (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      console.log(data);
//      data=[{exercises:[{duration:12}]},{exercises:[{duration:13}]}];

      res.json(data);
    }
  });
});
    
/*
  app.get("/redirect", (req, res) => {
      res.sendFile(path.join(__dirname + "/public/index.html"));
  });
*/