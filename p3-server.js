const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-module.js");

//part 8
fastify.get("/", (request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      reply.code(500).send("Internal Server Error");
      return;
    } else {
      reply
        .code(200)
        .type("Content-Type", "text/html; charset=utf-8")
        .send(data);
    }
  });
});

//part 9
//my 3 x 25 coin keeps downloading the file...not showing the code not sure why.
fastify.get("/coin", (request, reply) => {
  let { denom = 0, count = 0 } = request.query;

  denom = parseInt(denom);
  count = parseInt(count);
  
  const coinage = coinCount({denom, count});

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send( `<h2>Value of ${count} of ${denom} is ${coinage}</h2><br /><a href="/">Home</a>` );
});
//instead of text/html I tried out application to html and it lead me to actually just install a program, what does application do? 

//part 10
fastify.get("/coins", (request, reply) => {
  const { option } = request.query;
  let coinValue = 0;
  const coins = [{ denom: 25, count: 2}, {denom: 1, count: 7}]
  switch (option) {
    case "1":
      coinValue = coinCount ({ denom: 5, count: 3 }, { denom : 10, count: 2 });
      break;
    case "2":
      //do we need to define denom and count values here too? this is what was given
      coinValue = coinCount(...coins);
      break;
    case "3":
    //other variation  
    //const coins = [{ denom: 25, count: 1}, { denom: 1, count: 2 }, { denom: 5, count: 6 }]
      coinValue = coinCount(coins);
      break;
    default:
      break;
  }

  const result = `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(result);
});

fastify.listen(8080, "localhost", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});


