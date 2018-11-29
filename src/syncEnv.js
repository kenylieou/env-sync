const dotenv = require('dotenv');
const dotenvStringify = require('dotenv-stringify');
const fs = require('fs');
const path = require('path');
const shallowChanges = require('shallow-changes');

exports.syncEnv = (file1, file2, options) => {
    const fileName1 = path.basename(file1);
    const fileName2 = path.basename(file2);

    if (!fs.existsSync(file1)) {
        console.error(`${file1} does not exist`);
        process.exit(1);
    }
    if (!fs.existsSync(file2)) {
        console.error(`${file2} does not exist`);
        process.exit(1);
    }

    const env1 = dotenv.parse(fs.readFileSync(file1));
    const env2 = dotenv.parse(fs.readFileSync(file2));

    const changes = shallowChanges(env1, env2);

    let updatedVars = {},
        removedVars = [];

    if (options.verbose) {
        console.log(`There are ${changes.equal.length} variable(s) equal with ${fileName2}`);
    }
    if (changes.added.length > 0) {
        console.log(`There are ${changes.added.length} new variable(s) from ${fileName2}:`);
        for (let i in changes.added) {
            const varName = changes.added[i];
            console.log(`- ${varName}=${env2[varName] ? env2[varName] : 'null'}`);
        }
    }

    if (changes.updated.length > 0) {
        let diffMessage = [];
        for (let i in changes.updated) {
            const varName = changes.updated[i];
            const env1Val = env1[varName];
            if (!env1Val) {
                diffMessage.push(`- ${varName}=${env2[varName] ? env2[varName] : 'null'}`);
                updatedVars[varName] = env2[varName];
            }
        }
        if (diffMessage.length > 0) {
            console.log(`There are variables having value different from ${fileName2} which are empty in ${fileName1}:`);
            console.log(diffMessage.join('\n'));
        }
    }

    if (changes.deleted.length > 0) {
        console.log(`There are ${changes.deleted.length} variable(s) not exists in ${fileName2}:`);
        for (let i in changes.deleted) {
            const varName = changes.deleted[i];
            console.log(`- ${varName}=${env1[varName] ? env1[varName] : 'null'}`);
            removedVars.push(varName);
        }
    }

    const newEnv = Object.assign({}, env2, env1, updatedVars);
    for (let i in removedVars) {
        delete newEnv[removedVars[i]];
    }
    const envContent = dotenvStringify.stringify(newEnv);

    if (options.verbose) {
        console.log("=========== NEW ENVIRONMENT =============");
        console.log(envContent);
        console.log("=========== END NEW ENVIRONMENT =========");
    }

    if (options.sync) {
        fs.writeFileSync(`${file1}`, envContent);

        console.log(`Written changes to file ${file1}`);
    }
};
