import { MoreHorizontal, Send } from "lucide-react";
import { useState } from "react";

interface MCQOption {
  id: string;
  text: string;
}

interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
}

const careerQuestions: MCQQuestion[] = [
  {
    id: "1",
    question: "A home appliance stops working. What do you do?",
    options: [
      { id: "a", text: "Try a quick fix to see if it works." },
      { id: "b", text: "Think of another temporary solution." },
      { id: "c", text: "Look for what might be causing it." },
      { id: "d", text: "Organise what to do next with others." },
    ],
  },
  {
    id: "2",
    question:
      "You see a new product advertisement. What catches your attention first?",
    options: [
      { id: "a", text: "Whether the message feels neat and organised." },
      { id: "b", text: "How the product actually works." },
      { id: "c", text: "The visuals and how fresh the idea looks." },
      { id: "d", text: "Whether the message makes sense logically." },
    ],
  },
  {
    id: "3",
    question: "You're planning a family outing. What's the first thing you do?",
    options: [
      { id: "a", text: "Find what everyone should do and when." },
      { id: "b", text: "Compare different places carefully." },
      { id: "c", text: "Look at how you can reach there easily." },
      { id: "d", text: "Think of fun ideas to make it special." },
    ],
  },
  {
    id: "4",
    question:
      "You receive a long message with lots of details. How do you handle it?",
    options: [
      { id: "a", text: "Pick out the most important points." },
      { id: "b", text: "Rearrange the information so it flows better." },
      { id: "c", text: "Try a simple action to understand it quickly." },
      { id: "d", text: "Think of a clear example to relate it to." },
    ],
  },
  {
    id: "5",
    question: "You bump into a confusing situation. What's your instinct?",
    options: [
      { id: "a", text: "Try to solve it immediately with what you have." },
      { id: "b", text: "Think of an unusual but possible solution." },
      { id: "c", text: "Figure out where the confusion started." },
      { id: "d", text: "Set a small plan to move ahead." },
    ],
  },
  {
    id: "6",
    question:
      "You have to choose between two similar items. What helps you decide?",
    options: [
      { id: "a", text: "Which one fits your routine better." },
      { id: "b", text: "Which option looks more appealing." },
      { id: "c", text: "Which one works better for long term." },
      { id: "d", text: "Which one makes more sense logically." },
    ],
  },
  {
    id: "7",
    question: "Someone asks you to explain something. How do you start?",
    options: [
      { id: "a", text: "With a simple story or example." },
      { id: "b", text: "With the first step of how to do it." },
      { id: "c", text: "With a clear outline of the steps." },
      { id: "d", text: "By breaking it into basic ideas." },
    ],
  },
  {
    id: "8",
    question: "You're assembling something new. What do you do first?",
    options: [
      { id: "a", text: "Try understanding how the parts connect." },
      { id: "b", text: "Follow the steps in order." },
      { id: "c", text: "Try assembling based on what feels right." },
      { id: "d", text: "Try arranging it in a fresh, fun way." },
    ],
  },
  {
    id: "9",
    question: "During a conversation, what do you naturally contribute?",
    options: [
      { id: "a", text: "Practical suggestions." },
      { id: "b", text: "Fresh ideas others may not think of." },
      { id: "c", text: "Organised ways to continue the topic." },
      { id: "d", text: "Reasoned points based on logic." },
    ],
  },
  {
    id: "10",
    question: "You're choosing a gift for someone. How do you decide?",
    options: [
      { id: "a", text: "Something useful and reliable." },
      { id: "b", text: "Something with a creative touch." },
      { id: "c", text: "Something that suits their daily plan." },
      { id: "d", text: "Something that fits their personality logically." },
    ],
  },
  // {
  //   id: "11",
  //   question:
  //     "You notice something is not working properly. What do you see first?",
  //   options: [
  //     { id: "a", text: "Some step in the process is off." },
  //     { id: "b", text: "Something unusual in how it behaves." },
  //     { id: "c", text: "A small visible flaw or issue." },
  //     { id: "d", text: "Something that doesn't look right creatively." },
  //   ],
  // },
  // {
  //   id: "12",
  //   question:
  //     "You're helping a friend solve a small issue. What do you focus on?",
  //   options: [
  //     { id: "a", text: "Show them a simple fix." },
  //     { id: "b", text: "Help them think through the cause." },
  //     { id: "c", text: "Suggest a better-looking or fun way to do it." },
  //     { id: "d", text: "Guide them through proper steps." },
  //   ],
  // },
  // {
  //   id: "13",
  //   question: "You are stuck waiting somewhere. What do you do?",
  //   options: [
  //     { id: "a", text: "Try something new or fun to pass time." },
  //     { id: "b", text: "Think of the pattern that caused the delay." },
  //     { id: "c", text: "Adjust your schedule." },
  //     { id: "d", text: "Check nearby options or tools to use." },
  //   ],
  // },
  // {
  //   id: "14",
  //   question: "You see two people arguing. How do you respond?",
  //   options: [
  //     { id: "a", text: "Understand both sides calmly." },
  //     { id: "b", text: "Try a light creative comment to ease tension." },
  //     { id: "c", text: "Bring order by letting them talk in turn." },
  //     { id: "d", text: "Suggest a simple fix they can try." },
  //   ],
  // },
  // {
  //   id: "15",
  //   question: "You're setting up your workspace. What do you care about most?",
  //   options: [
  //     { id: "a", text: "A unique or pleasant look." },
  //     { id: "b", text: "Everything placed in proper order." },
  //     { id: "c", text: "Tools and items that help you work better." },
  //     { id: "d", text: "Logical arrangement of things." },
  //   ],
  // },
  // {
  //   id: "16",
  //   question: "You need to learn something new. How do you begin?",
  //   options: [
  //     { id: "a", text: "Try it hands-on immediately." },
  //     { id: "b", text: "Look for patterns or main ideas." },
  //     { id: "c", text: "Use a creative approach to understand it." },
  //     { id: "d", text: "Prepare a small plan." },
  //   ],
  // },
  // {
  //   id: "17",
  //   question: "You're asked to guide a junior. What do you focus on?",
  //   options: [
  //     { id: "a", text: "Showing them how to do it properly." },
  //     { id: "b", text: "Helping them think through decisions." },
  //     { id: "c", text: "Making it interesting for them to learn." },
  //     { id: "d", text: "Giving them small steps to follow." },
  //   ],
  // },
  // {
  //   id: "18",
  //   question: "Someone gives you mixed information. What do you do?",
  //   options: [
  //     { id: "a", text: "Re-arrange it in simple order." },
  //     { id: "b", text: "Think creatively to find meaning." },
  //     { id: "c", text: "Check possible causes." },
  //     { id: "d", text: "Try small actions to test it." },
  //   ],
  // },
  // {
  //   id: "19",
  //   question: "You see a trending idea online. What attracts you?",
  //   options: [
  //     { id: "a", text: "The unique twist behind it." },
  //     { id: "b", text: "The reason it became popular." },
  //     { id: "c", text: "How people are managing and timing posts." },
  //     { id: "d", text: "How people are actually doing it." },
  //   ],
  // },
  // {
  //   id: "20",
  //   question: "You buy something new. What do you explore first?",
  //   options: [
  //     { id: "a", text: "How good it looks or feels." },
  //     { id: "b", text: "How it can be used efficiently." },
  //     { id: "c", text: "Why it works the way it does." },
  //     { id: "d", text: "Where it fits in your routine." },
  //   ],
  // },
  {
    id: "21",
    question:
      "Your mixie suddenly stops while running. What do you check first?",
    options: [
      { id: "a", text: "If the jar wasn't locked properly" },
      { id: "b", text: "If the mixie is old" },
      { id: "c", text: "If someone used it before" },
      { id: "d", text: "If changing the color would help" },
    ],
  },
  {
    id: "22",
    question:
      "Your laptop becomes slow only on some days. What seems most sensible to check?",
    options: [
      { id: "a", text: "What apps were open on those days" },
      { id: "b", text: "If the charger was plugged in" },
      { id: "c", text: "The weather outside" },
      { id: "d", text: "If it's because it's Monday" },
    ],
  },
  {
    id: "23",
    question: "You need to assemble a new table. What do you do first?",
    options: [
      { id: "a", text: "Sort the parts based on size" },
      { id: "b", text: "Start fixing pieces randomly" },
      { id: "c", text: "Read only half the instructions" },
      { id: "d", text: "Ask someone else to finish it" },
    ],
  },
  {
    id: "24",
    question: "Your phone storage is full. How will you solve it?",
    options: [
      { id: "a", text: "Check which type of files take the most space" },
      { id: "b", text: "Delete the first 5 photos you find" },
      { id: "c", text: "Restart the phone" },
      { id: "d", text: "Install another storage app" },
    ],
  },
  {
    id: "25",
    question: "You want to learn a new tool. How will you begin?",
    options: [
      { id: "a", text: "Start with basic features before trying complex ones" },
      { id: "b", text: "Try everything randomly to see what works" },
      { id: "c", text: "Watch one advanced tutorial first" },
      { id: "d", text: "Ask a friend to explain it fully" },
    ],
  },
  {
    id: "26",
    question: "You must fix a noisy fan. What is the best first step?",
    options: [
      { id: "a", text: "Check where the noise is coming from" },
      { id: "b", text: "Oil every part without checking" },
      { id: "c", text: "Buy a new fan immediately" },
      { id: "d", text: "Switch it on/off repeatedly" },
    ],
  },
  {
    id: "27",
    question:
      "You check your step count for a week and see one day is unusually high. What will you do?",
    options: [
      { id: "a", text: "Compare it with other days to see what changed" },
      { id: "b", text: "Ignore it and move on" },
      { id: "c", text: "Blame the phone sensor" },
      { id: "d", text: "Delete the step history" },
    ],
  },
  {
    id: "28",
    question:
      "A shop sells more snacks on rainy days. What seems most useful to know?",
    options: [
      { id: "a", text: "How often rain and sales go up together" },
      { id: "b", text: "How many workers were present" },
      { id: "c", text: "The color of the snack packets" },
      { id: "d", text: "The shop's closing time" },
    ],
  },
  {
    id: "29",
    question:
      "A friend wants to understand why their marks drop sometimes. What will you check first?",
    options: [
      { id: "a", text: "The type of questions they often get wrong" },
      { id: "b", text: "Their handwriting" },
      { id: "c", text: "The classroom temperature" },
      { id: "d", text: "Whether they used a new pen" },
    ],
  },
  {
    id: "30",
    question:
      "You have 20 photos of a product. What helps you describe it better?",
    options: [
      { id: "a", text: "Picking only the 3–4 photos that tell the main idea" },
      { id: "b", text: "Showing all 20 photos randomly" },
      { id: "c", text: "Hiding half the photos" },
      { id: "d", text: "Only describing its color" },
    ],
  },
  // {
  //   id: "31",
  //   question:
  //     "Your bike uses more petrol during certain weeks. What will you think about?",
  //   options: [
  //     { id: "a", text: "Whether long trips happened on those weeks" },
  //     { id: "b", text: "If the petrol cap looks nice" },
  //     { id: "c", text: "The brand of tyres" },
  //     { id: "d", text: "Whether others also bought petrol then" },
  //   ],
  // },
  // {
  //   id: "32",
  //   question:
  //     "A YouTube video gets more views on weekends. What can you guess?",
  //   options: [
  //     { id: "a", text: "People may watch more during free days" },
  //     { id: "b", text: "The video title changed automatically" },
  //     { id: "c", text: "The video got older" },
  //     { id: "d", text: "The color tone changed" },
  //   ],
  // },
  // {
  //   id: "33",
  //   question:
  //     "You need to explain a difficult idea to a friend. What do you do?",
  //   options: [
  //     { id: "a", text: "Use a simple story or example to make it clear" },
  //     { id: "b", text: "Repeat the same definition again" },
  //     { id: "c", text: "Tell them to search online" },
  //     { id: "d", text: "Give a long explanation with big words" },
  //   ],
  // },
  // {
  //   id: "34",
  //   question:
  //     "You have two objects that don't seem related. How do you understand their connection?",
  //   options: [
  //     {
  //       id: "a",
  //       text: "Think of a creative purpose they could serve together",
  //     },
  //     { id: "b", text: "Compare their size and shape only" },
  //     { id: "c", text: "Keep them separate—they're unrelated" },
  //     { id: "d", text: "Ask someone else what they think" },
  //   ],
  // },
  // {
  //   id: "35",
  //   question:
  //     "You see clouds moving in a strange pattern. What is your first thought?",
  //   options: [
  //     { id: "a", text: "There might be a larger weather change behind it" },
  //     { id: "b", text: "Clouds move… that's normal" },
  //     { id: "c", text: "Maybe it's just windy today" },
  //     { id: "d", text: "Check if someone else noticed it" },
  //   ],
  // },
  // {
  //   id: "36",
  //   question:
  //     "You hear that a new rule is introduced at school/office. What do you try to understand?",
  //   options: [
  //     { id: "a", text: "The bigger purpose behind the rule" },
  //     { id: "b", text: "Only what the rule says" },
  //     { id: "c", text: "Why rules keep changing" },
  //     { id: "d", text: "Ignore it and continue as usual" },
  //   ],
  // },
  // {
  //   id: "37",
  //   question:
  //     "You must reach a place but your usual route is blocked. What do you do?",
  //   options: [
  //     { id: "a", text: "Try a different route based on what you know" },
  //     { id: "b", text: "Wait until the block clears" },
  //     { id: "c", text: "Call someone to ask for directions" },
  //     { id: "d", text: "Try only the second-most common route" },
  //   ],
  // },
  // {
  //   id: "38",
  //   question:
  //     "You are given a task but the usual method isn't working. What is your approach?",
  //   options: [
  //     { id: "a", text: "Try a new approach and see if it works better" },
  //     { id: "b", text: "Repeat the old method again" },
  //     { id: "c", text: "Stop the task for now" },
  //     { id: "d", text: "Ask someone else to do it for you" },
  //   ],
  // },
  // {
  //   id: "39",
  //   question:
  //     "You are filling out a form and notice two spellings of your name in different places. What will you do?",
  //   options: [
  //     { id: "a", text: "Correct the wrong one before submitting" },
  //     { id: "b", text: "Submit it and fix later" },
  //     { id: "c", text: 'Leave it because it\'s "almost correct"' },
  //     { id: "d", text: "Ignore it completely" },
  //   ],
  // },
  // {
  //   id: "40",
  //   question:
  //     'Your friend gives you a list of items to buy: "Milk, Bread, Milk, Eggs." What do you do?',
  //   options: [
  //     { id: "a", text: 'Check if "Milk" was repeated by mistake' },
  //     { id: "b", text: "Buy everything as written" },
  //     { id: "c", text: "Ask someone else what to do" },
  //     { id: "d", text: "Buy only one item you remember" },
  //   ],
  // },
  // {
  //   id: "41",
  //   question:
  //     "You plug your phone into a charger and hear a spark sound. What is the safest action?",
  //   options: [
  //     { id: "a", text: "Stop using the charger and check what caused it" },
  //     { id: "b", text: "Continue charging because it works" },
  //     { id: "c", text: "Use the same charger again later" },
  //     { id: "d", text: "Ignore it completely" },
  //   ],
  // },
  // {
  //   id: "42",
  //   question:
  //     "Your younger sibling is trying to use scissors too close to their face. What do you do?",
  //   options: [
  //     { id: "a", text: "Stop them and explain why it's risky" },
  //     { id: "b", text: 'Tell them to "be careful" and continue' },
  //     { id: "c", text: "Watch from far and hope they don't get hurt" },
  //     { id: "d", text: "Ignore it" },
  //   ],
  // },
  // {
  //   id: "43",
  //   question:
  //     "Your teacher gives a class rule: submit homework before 8 PM. What will you do?",
  //   options: [
  //     { id: "a", text: "Always submit before 8 PM, even on busy days" },
  //     { id: "b", text: "Submit on time sometimes" },
  //     { id: "c", text: "Submit only when convenient" },
  //     { id: "d", text: "Ignore the rule" },
  //   ],
  // },
  // {
  //   id: "44",
  //   question:
  //     "You are arranging books on a shelf. What method will you follow?",
  //   options: [
  //     {
  //       id: "a",
  //       text: "Arrange them by size or category and follow the same pattern",
  //     },
  //     { id: "b", text: "Arrange randomly but neatly" },
  //     { id: "c", text: "Keep only your favourite books in order" },
  //     { id: "d", text: "Put them however they fall" },
  //   ],
  // },
  // {
  //   id: "45",
  //   question:
  //     "Your friend tries a new app but gets confused while using it. What do you do first?",
  //   options: [
  //     { id: "a", text: "Ask them which part felt confusing" },
  //     { id: "b", text: "Tell them to explore more" },
  //     { id: "c", text: "Assume they didn't pay attention" },
  //     { id: "d", text: "Show how you use it without asking their issue" },
  //   ],
  // },
  // {
  //   id: "46",
  //   question:
  //     "An elderly person finds it difficult to read text on a phone. What is the most helpful first step?",
  //   options: [
  //     { id: "a", text: "Increase the text size for them" },
  //     { id: "b", text: "Hand them your phone instead" },
  //     { id: "c", text: 'Say "You\'ll get used to it"' },
  //     { id: "d", text: "Change the wallpaper first" },
  //   ],
  // },
  // {
  //   id: "47",
  //   question:
  //     "You notice two shops: one crowded and one empty. What will you check first?",
  //   options: [
  //     { id: "a", text: "How neatly things are arranged inside" },
  //     { id: "b", text: "The colours of the signboard" },
  //     { id: "c", text: "The size of the shop" },
  //     { id: "d", text: "Which shop is closer to you" },
  //   ],
  // },
  // {
  //   id: "48",
  //   question:
  //     'Your friend says a website "feels messy." What would you look at to understand why?',
  //   options: [
  //     { id: "a", text: "The spacing and arrangement of items" },
  //     { id: "b", text: "The brand logo only" },
  //     { id: "c", text: "Just the background colour" },
  //     { id: "d", text: "How long the page is" },
  //   ],
  // },
  // {
  //   id: "49",
  //   question:
  //     "Someone keeps pressing the wrong button on a remote. What is the best first thought?",
  //   options: [
  //     { id: "a", text: "The buttons might be too similar or close" },
  //     { id: "b", text: "They are careless" },
  //     { id: "c", text: "The remote battery is low" },
  //     { id: "d", text: "They need more practice" },
  //   ],
  // },
  // {
  //   id: "50",
  //   question:
  //     "A visitor tries to open a door by pulling, but it needs to be pushed. What makes the most sense?",
  //   options: [
  //     { id: "a", text: "The handle design is sending the wrong signal" },
  //     { id: "b", text: "The person didn't look properly" },
  //     { id: "c", text: "The door is old" },
  //     { id: "d", text: "They rushed too much" },
  //   ],
  // },
  // {
  //   id: "51",
  //   question:
  //     "You open your refrigerator and notice one item looks slightly different from yesterday. What do you do first?",
  //   options: [
  //     { id: "a", text: "Check what changed and why" },
  //     { id: "b", text: "Ask someone else if they noticed it" },
  //     { id: "c", text: "Ignore it because everything still works" },
  //     { id: "d", text: "Close the fridge and deal with it later" },
  //   ],
  // },
  // {
  //   id: "52",
  //   question:
  //     "Your water bottle leaks a few drops only when you keep it sideways. What seems the best step?",
  //   options: [
  //     { id: "a", text: "Inspect where the water is coming from" },
  //     { id: "b", text: "Wipe it and move on" },
  //     { id: "c", text: "Buy a new bottle immediately" },
  //     { id: "d", text: "Ask someone to check the cap" },
  //   ],
  // },
  // {
  //   id: "53",
  //   question:
  //     "You receive a remote with several buttons. How will you check if it works properly?",
  //   options: [
  //     { id: "a", text: "Test each button one by one" },
  //     { id: "b", text: "Press only the main button and assume the rest work" },
  //     { id: "c", text: "Shake it to see if it turns on" },
  //     { id: "d", text: "Ask someone else to try it" },
  //   ],
  // },
  // {
  //   id: "54",
  //   question:
  //     "Your lamp sometimes flickers when switched on. What will you do?",
  //   options: [
  //     { id: "a", text: "Try the lamp with a different socket to compare" },
  //     { id: "b", text: "Hit the lamp gently to see if it works" },
  //     { id: "c", text: "Switch it on and off a few times randomly" },
  //     { id: "d", text: "Call an electrician immediately" },
  //   ],
  // },
  // {
  //   id: "55",
  //   question:
  //     "You need to prepare tea for 5 people. What is the best way to ensure it comes out the same every time?",
  //   options: [
  //     {
  //       id: "a",
  //       text: "Follow the same order and same amount of ingredients each time",
  //     },
  //     { id: "b", text: "Add ingredients based on mood" },
  //     { id: "c", text: "Taste and adjust during every step" },
  //     { id: "d", text: "Ask someone else to guide each time" },
  //   ],
  // },
  // {
  //   id: "56",
  //   question:
  //     "You have to check 20 notebooks for signatures. How will you complete the task?",
  //   options: [
  //     {
  //       id: "a",
  //       text: "Check them one by one in the same order to avoid missing any",
  //     },
  //     { id: "b", text: "Randomly pick notebooks and check signatures" },
  //     { id: "c", text: "Check a few now and a few later with no sequence" },
  //     { id: "d", text: "Ask someone to confirm while you check" },
  //   ],
  // },
  // {
  //   id: "57",
  //   question:
  //     "You and your friends need to complete a group poster, but everyone is doing different parts randomly. What will you do first?",
  //   options: [
  //     { id: "a", text: "Decide who will do which part before starting" },
  //     { id: "b", text: "Let everyone continue and see what happens" },
  //     { id: "c", text: "Finish your own part only" },
  //     { id: "d", text: "Ask someone else to take charge" },
  //   ],
  // },
  // {
  //   id: "58",
  //   question:
  //     "Your family is preparing for a small event, and tasks are getting mixed up. What seems most useful?",
  //   options: [
  //     { id: "a", text: "List tasks and assign who will handle each" },
  //     { id: "b", text: "Wait and see who starts doing what" },
  //     { id: "c", text: "Do everything yourself" },
  //     { id: "d", text: "Ignore the confusion" },
  //   ],
  // },
  // {
  //   id: "59",
  //   question:
  //     "You have to travel tomorrow morning. What is the best way to prepare?",
  //   options: [
  //     {
  //       id: "a",
  //       text: "Pack your things and plan your route the night before",
  //     },
  //     { id: "b", text: "Pack only when leaving" },
  //     { id: "c", text: "Pack partially and hope nothing is forgotten" },
  //     { id: "d", text: "Ask others what you should pack" },
  //   ],
  // },
  // {
  //   id: "60",
  //   question:
  //     "You want to study three chapters, but time is limited. What will you do?",
  //   options: [
  //     {
  //       id: "a",
  //       text: "Plan which chapter to do first and how much time to spend",
  //     },
  //     { id: "b", text: "Start with whichever chapter you see first" },
  //     { id: "c", text: "Try to do all chapters at once" },
  //     { id: "d", text: "Leave it for later" },
  //   ],
  // },
  // {
  //   id: "61",
  //   question:
  //     "You have to do laundry, finish homework, and meet a friend. What will you do first?",
  //   options: [
  //     { id: "a", text: "Do the most important or urgent task first" },
  //     { id: "b", text: "Do all tasks without order" },
  //     { id: "c", text: "Do the easiest task first" },
  //     { id: "d", text: "Skip one task completely" },
  //   ],
  // },
  // {
  //   id: "62",
  //   question:
  //     "You receive many WhatsApp messages at once. How will you respond?",
  //   options: [
  //     { id: "a", text: "Reply to the most important conversation first" },
  //     { id: "b", text: "Reply in the order messages arrived" },
  //     { id: "c", text: "Reply to who you like the most" },
  //     { id: "d", text: "Ignore all messages" },
  //   ],
  // },
  {
    id: "63",
    question: 'Which option best describes what a "loop" does in programming?',
    options: [
      { id: "a", text: "Repeats a set of steps until a condition is met" },
      { id: "b", text: "Stores data permanently" },
      { id: "c", text: "Stops the program from running" },
      { id: "d", text: "Displays information on the screen" },
    ],
  },
  {
    id: "64",
    question: 'When writing code, what is the purpose of a "variable"?',
    options: [
      {
        id: "a",
        text: "To store values that may change while the program runs",
      },
      { id: "b", text: "To draw shapes on the screen" },
      { id: "c", text: "To repeat lines of code forever" },
      { id: "d", text: "To stop errors from happening" },
    ],
  },
  {
    id: "65",
    question:
      "You write a program and it shows an error. What is the BEST first step?",
    options: [
      { id: "a", text: "Check which line the error message is pointing to" },
      { id: "b", text: "Rewrite the whole program from scratch" },
      { id: "c", text: "Ignore the error and continue" },
      { id: "d", text: "Ask someone else to fix it immediately" },
    ],
  },
  {
    id: "66",
    question: 'What does "if–else" help you do in a program?',
    options: [
      { id: "a", text: "Make decisions based on conditions" },
      { id: "b", text: "Save information on your computer" },
      { id: "c", text: "Turn the computer off" },
      { id: "d", text: "Draw tables or charts" },
    ],
  },
  {
    id: "67",
    question: "Why is indentation (spacing) important in coding?",
    options: [
      {
        id: "a",
        text: "It makes the code more readable and helps avoid mistakes",
      },
      { id: "b", text: "It makes the program run faster" },
      { id: "c", text: "It changes the color of the text" },
      { id: "d", text: "It is only used for decoration" },
    ],
  },
  {
    id: "68",
    question:
      "You want to repeat an action exactly 10 times. What should you use?",
    options: [
      { id: "a", text: "A loop with a fixed count" },
      { id: "b", text: "A variable with a random value" },
      { id: "c", text: "An if-condition that never changes" },
      { id: "d", text: "A function that calls itself repeatedly" },
    ],
  },
  {
    id: "69",
    question: 'What is the purpose of a "function" in programming?',
    options: [
      {
        id: "a",
        text: "To group related steps together so you can reuse them",
      },
      { id: "b", text: "To store pictures" },
      { id: "c", text: "To show error messages" },
      { id: "d", text: "To make the code look longer" },
    ],
  },
  {
    id: "70",
    question: 'When writing code, what does "commenting" help with?',
    options: [
      { id: "a", text: "Understanding what the code is doing later" },
      { id: "b", text: "Running the program faster" },
      { id: "c", text: "Hiding errors in the program" },
      { id: "d", text: "Showing text on the screen" },
    ],
  },
  {
    id: "71",
    question:
      "Your program runs but gives the wrong answer. What should you check?",
    options: [
      { id: "a", text: "Whether your logic and steps are correct" },
      { id: "b", text: "If your computer has enough storage" },
      { id: "c", text: "If your keyboard is new" },
      { id: "d", text: "The background color of your editor" },
    ],
  },
  {
    id: "72",
    question: "What is the purpose of testing your code frequently?",
    options: [
      { id: "a", text: "To catch mistakes early and fix them easily" },
      { id: "b", text: "To make the code colorful" },
      { id: "c", text: "To confuse hackers" },
      { id: "d", text: "To make the file size smaller" },
    ],
  },
];

export function CareerCompass() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [assessmentTerminated, setAssessmentTerminated] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswerSelect = (questionId: string, optionText: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionText }));
  };

  const submitAssessment = () => {
    if (Object.keys(userAnswers).length === careerQuestions.length) {
      setShowResults(true);
    }
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    if (showAssessment && !showResults && !assessmentTerminated) {
      setShowWarningPopup(true);
      return;
    }

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setChatInput("");
    setIsLoading(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a sample response. You can integrate your actual chat logic here.",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleWarningConfirm = () => {
    setUserAnswers({});
    setShowResults(false);
    setAssessmentTerminated(true);
    setShowWarningPopup(false);

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setChatInput("");
    setIsLoading(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a sample response. You can integrate your actual chat logic here.",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const generateRecommendation = (): string => {
    const values = Object.values(userAnswers);

    if (
      values.includes("Technical/Programming skills") &&
      values.includes("Learning new technologies and innovation")
    ) {
      return "🚀 Software Development Career Path - Based on your responses, you'd excel in software development roles. Consider specializing in web development, mobile apps, or emerging technologies like AI/ML.";
    }

    if (
      values.includes("Leadership and management") &&
      values.includes("High salary and financial growth")
    ) {
      return "💼 Management & Leadership Track - Your profile suggests strong potential in management roles. Consider pursuing project management, team leadership, or executive positions.";
    }

    if (
      values.includes("Creative and design skills") &&
      values.includes("Making a positive impact on society")
    ) {
      return "🎨 Creative Impact Career - You're well-suited for roles in UX/UI design, marketing, or social impact organizations where creativity meets purpose.";
    }

    if (values.includes("Work-life balance and flexibility")) {
      return "⚖️ Flexible Career Options - Consider remote-friendly roles, consulting, or companies with strong work-life balance policies. Freelancing might also be a good fit.";
    }

    return "🌟 Diverse Career Opportunities - Your responses show versatility! Consider exploring multiple career paths through internships, side projects, or informational interviews to find your perfect fit.";
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50">
      <div className="border-b border-[#0d0d0d0d] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg text-gray-900">Career Compass</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto p-6">
          {isLoading && (
            <div className="flex items-start space-x-3 mb-6">
              <div className="flex-1">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div className="">
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-start space-y-6">
                <p className="text-gray-800 mb-4">
                  Awesome! You’re just about to kick-start your Career Compass
                  journey. In this quick mission, we’ll understand who you are,
                  how you think, and what career path suits you the best.
                </p>
                <p className="text-gray-800 mb-4">
                  <b>Level 1:</b> will have simple psychometric questions to
                  understand your mindset, behaviour, and decision style.
                </p>
                <p className="text-gray-800 mb-4">
                  <b>Level 2:</b> mixes psychometric + basic technical questions
                  to see how you connect logic with skills.
                </p>
                <p className="text-gray-800 mb-4">
                  <b>Level 3:</b> dives into pure technical questions to
                  validate your real-world understanding. Ready ah? Let’s find
                  the career that actually fits you.”
                </p>
                {!showAssessment && (
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="px-4 py-2 rounded-lg border border-[#00BF53] text-[#00BF53] mx-auto flex hover:bg-[#00BF53]/[0.1] transition-colors"
                  >
                    Start Career Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
          {showAssessment && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg py-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="text-gray-800 mb-4">
                      Please answer all questions to get your personalized
                      career recommendation:
                    </p>

                    <div className="space-y-6">
                      {careerQuestions.map((question, index) => (
                        <div
                          key={question.id}
                          className="border-l-4 border-[#00BF53]/[0.1] pl-4"
                        >
                          <h3 className="font-medium text-gray-800 mb-3">
                            {index + 1}. {question.question}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <label
                                key={option.id}
                                className="flex items-center space-x-3 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.text}
                                  onChange={() =>
                                    handleAnswerSelect(question.id, option.text)
                                  }
                                  className="text-blue-500"
                                />
                                <span className="text-gray-700">
                                  {option.text}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {!showResults && (
                      <button
                        onClick={submitAssessment}
                        disabled={
                          Object.keys(userAnswers).length !==
                          careerQuestions.length
                        }
                        className="mt-6 border border-[#00BF53] text-[#00BF53] hover:bg-[#00BF53]/[0.1] px-6 py-2 rounded-lg disabled:border-0 disabled:text-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Get My Career Recommendation
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {showResults && (
                <div className="bg-white rounded-lg py-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="text-gray-800">
                        {generateRecommendation()}
                      </p>
                      <button
                        onClick={() => {
                          setShowAssessment(false);
                          setUserAnswers({});
                          setShowResults(false);
                          setAssessmentTerminated(false);
                        }}
                        className="mt-4 border border-black px-4 py-2 hover:border-[#00BF53] hover:text-[#00BF53] rounded-lg transition-colors"
                      >
                        Take Assessment Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {assessmentTerminated && (
                <div className="rounded-lg my-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Assessment terminated. You can now chat normally.
                  </p>
                </div>
              )}
            </div>
          )}
          {chatMessages.map((message, index) => (
            <div key={index} className="mb-6">
              {message.role === "assistant" ? (
                <div className="flex items-start space-x-3">
                  <div className="flex-1 space-y-2">
                    <div className="prose max-w-none">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-right mb-4">
                  <div className="inline-block bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-tr-md max-w-[80%]">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto py-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChatSubmit();
            }}
            className="relative"
          >
            <div className="flex items-end space-x-3 border border-gray-300 rounded-full p-3">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
                placeholder="Ask anything"
                className="flex-1 bg-transparent border-0 self-center outline-none resize-none text-gray-900 placeholder-gray-500 min-h-[24px] max-h-32"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isLoading}
                className="w-8 h-8 bg-[#00BF53] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {showWarningPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Warning</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Current assessment data will be cleared if you continue. Do you
                want to proceed?
              </p>
              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowWarningPopup(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWarningConfirm}
                  className="px-4 py-2 bg-[#00BF53] text-white rounded-lg hover:bg-[#00a045] transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
