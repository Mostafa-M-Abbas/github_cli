import yargs from "yargs";
import axios from 'axios'; 
import fs from "fs";

const argv = yargs.usage("Usage: -u <username>").option("u", {
  alias: "username",
  describe: "GitHub username",
  type: "string",
  demandOption: true,
}).argv;
    
const getRepos = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        return response.data.map(repo => repo.name);
    } catch (err) {
        console.error("Error fetching repositories:", err.message);

    }
}

const saveToFile = (username, repoName)=>{
    const fileName = `${username}.txt`; 
    fs.writeFile(fileName, repoName.join("\n"));
    console.log(`Repository names saved to ${fileName}`);
}

const main = async () => {
    const username = argv.username || "";
    console.log(`Fetching repositories for user: ${username}`);

    const repoNames = await getRepos(username);
    if (repoNames && repoNames.length > 0) {
        saveToFile(username, repoNames);
    } else {
        console.log("No repositories found for this user.");
    }
}
main();

