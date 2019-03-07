var inquirer = require("inquirer");

function Entry() {
    this.data = [];

    this.set = function (key, value) {
        if (key && value) {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].key === key) {
                    this.data[i].value = value;
                    console.log(this.data);
                    return start();
                }
            }
            this.data.push({
                key: key,
                value: value
            });
            console.log(this.data);
            start();
        }
    };

    this.get = function (key) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].key === key) {
                console.log(this.data[i].value);
                return start();
            }
        }
        console.log('NULL');
        start();
    };

    this.unset = function (key) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].key === key) {
                this.data.splice(i, 1);
                console.log(this.data)
            }
        }
        start();
    };

    this.numequalto = function (value) {

        var answer = 0;

        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].value === value) {
                answer++;
            }
        }
        console.log(answer);
        start();
    }

    this.exit = function () {
        process.exit();
    }
}

var newEntry = new Entry();



function start() {
    inquirer.prompt([
        {
            name: "options",
            message: "What do you want to do?",
            type: "input"
        }

    ]).then(function (answers) {

        var command = answers.options.split(' ')[0];
        var key = answers.options.split(' ')[1];
        var value = answers.options.split(' ')[2];

        switch (command) {
            case "SET":
                newEntry.set(key, value);
                break;
            case "GET":
                newEntry.get(key);
                break;
            case "UNSET":
                newEntry.unset(key);
                break;
            case "NUMEQUALTO":
                newEntry.numequalto(key);
                break;
            case "END":
                newEntry.exit();
                break;
        };


    });
}

start();