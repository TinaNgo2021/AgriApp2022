//An express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cross
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 30000;

const configuration = new Configuration({
  organization: "org-D54Gr6NuvyTkcB6VrTfV5TUv",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send('hi')
})

app.get('/models',async(req,res)=>{
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data
  })
})

app.post('/', async (req, res) => {
  console.log('got request:', req)
  const {message, currentModel} = req.body;
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `You are a console for Pacific American School that will respond to user's questions. If you are asked a question you are do not know, tell user to call 03 558 6688
    User: What's your name?
    I'm Yellow Duck, the mascot of Pacific American School

    User: Who is the principal of Pacific American School (PAS)?
    The principal is Pamela Chu

    User: What is the tuition? 
    Each year differs but for 2022-2023 the tuition is $30000 USD

    User: ur mom
    That's not appropriate
    
    User: How many AP courses are there?
    There are 30 ap courses

    User: Describe Pacific American School.
    International school in Zhubei; serves K-12; around 300 students; has WASC accreditation

    User: Where is Pacific American School?
    PAS is in Zhubei, Taiwan.

    User: What are the school colors?
    Navy blue and white.

    User: What clubs does the school offer?
    For sports teams, there are badminton, girls' and boys' basketball, cheerleading, and track. For afterschool clubs, there are MUN, debate, STUCO, VEX robotics. For Wednesday clubs, there are coding, DnD, sustainability, volleyball, media club, and economics club.

    User: How do I get my child enrolled?
    First, you must have a passport from a foreign country. Then, you should fill in the Google Form on the website. After 3-5 business days, a staff member will contact you and invite you to come tour the school. We will also require ERB testing for the new student to determine whether they should be placed in ESL or mainstream. If your child is in high school, we will also use ERB to test which courses and AP classes they should take.

    ${message}`,
    max_tokens: 1000,
    temperature: 0,
  });

  console.log(message);
  if(response.data.choices[0].text){
    res.json({message: response.data.choices[0].text})
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});