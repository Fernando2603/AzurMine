import fs from 'node:fs';
import fetch from 'node-fetch';

const repository  = "https://raw.githubusercontent.com/AzurLaneTools/AzurLaneData/main/";
const server_name = "CN";

// ship id
const ship_file = fs.readFileSync('./src/ship_id.json');
const new_ship  = JSON.parse(ship_file);
// type of file is array prototype

Promise.all([
    fetch(repository + server_name + "/ShareCfg/ship_data_template.json")
    .then(res => res.json()),
    fetch(repository + server_name + "/sharecfgdata/ship_data_statistics.json")
    .then(res => res.json()),
]).then(
    ([id, ship]) => {
        main(new_ship, id, ship); 
    },
    (error) => {
        console.log('error: ' + error);
    }
);

function main(data, id, ship) {
    let new_id = [];
    let all_id = [];
    id.all.forEach((idx) => {
        let status = false;
        data.forEach((old) => {
            if ( old.id === idx ) { status = true };
        });

        all_id.push({ id: idx, code: ship[idx].english_name, name: ship[idx].name, type: ship[idx].type, rarity: ship[idx].rarity });
        if ( !status ) {
            new_id.push({ id: idx, code: ship[idx].english_name, name: ship[idx].name });
            console.log("=> " + idx.toString().padEnd(10) + ship[idx].english_name)
        };
    });


    const json_content   = JSON.stringify(new_id, null, '\t');
    const json_content_2 = JSON.stringify([...data, ...new_id], null, '\t');
    const json_content_3 = JSON.stringify(all_id, null, '\t');

    fs.writeFile("./src/database.json", json_content, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./database.json has been updated!");
    });

    fs.writeFile("./src/ship_id.json", json_content_2, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./ship_id.json has been updated!");
    });

    fs.writeFile("./src/all_id.json", json_content_3, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./all_id.json has been updated!");
    });
};