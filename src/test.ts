import { Llama } from "./index";

const bin = process.env.LLAMA_BIN;
const model = process.env.LLAMA_MODEL;
const assistant_name = "Ailsa";

if (!bin || !model) throw new Error("Please set the env variables LLAMA_BIN and LLAMA_MODEL correctly.");

const llama = new Llama(bin, model);

llama.setStopText("User:");

const template = `Transcript of a dialog, where the User interacts with an AI Assistant named ${assistant_name}. ${assistant_name} is helpful, kind, honest, and never fails to answer the User's requests immediately and with precision.

User: Hi, ${assistant_name}.
${assistant_name}: Hello! How may I help you today?
User: Please tell me the weather.
${assistant_name}: It is currently sunny out, the temperature is 97 degrees with a wind speed of 20 MPH. It is expected to rain later today.
User:`

llama.ask(`${template} What AI model do you use?`).then(async (v) => {
    console.log(v);

    const response2 = await llama.ask(`${v} Interesting. Can you tell me more?`);

    console.log(response2);
});