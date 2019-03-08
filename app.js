// Requiring the npm inquirer
var inquirer = require("inquirer");

// Setting up the dictionary
function Entry() {
    this.data = [];
    this.nestedData = [];
    var isBegin = false;

    // The set function
    this.set = function (key, value) {
        if (!isBegin) {
            console.log("yes");
            if (key && value) {
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].key === key) {
                        this.data[i].value = value;
                        return start();
                    }
                }
                this.data.push({
                    key: key,
                    value: value
                });
                start();
            }
        }
        else {
            if (key && value) {
                var newArray = this.nestedData[this.nestedData.length - 1]
                for (var i = 0; i < newArray.length; i++) {
                    if (newArray[i].key === key) {
                        newArray[i].value = value;
                        return start();
                    }
                }
                newArray.push({
                    key: key,
                    value: value
                });
                start();
            }
        }

    };

    // The get function
    this.get = function (key) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].key === key) {
                return start();
            }
        }
        console.log('NULL');
        start();
    };

    // The unset function
    this.unset = function (key) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].key === key) {
                this.data.splice(i, 1);
            }
        }
        start();
    };

    // The number equal to function 
    this.numequalto = function (value) {

        var answer = 0;

        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].value === value) {
                answer++;
            }
        }
        console.log(answer);
        start();
    };

    // The exit function
    this.exit = function () {
        process.exit();
    };

    // The begin function doesnt work. I think it has to do with the this.data not being mutable
    this.begin = function () {
        if (isBegin) {
            this.nestedData.push(this.data);
            start();
        }
        else {
            isBegin = true;
            var oldData = [];
            for (var i = 0; i < this.data.length; i++) {
                oldData.push(this.data[i])
            }
            this.nestedData.push(oldData, this.data);
            start();
        }


    }

    // this.print = function () {
    //     console.log('Old');
    //     console.log(this.data);
    //     console.log('Nested');
    //     console.log(this.nestedData);
    //     start();
    // }
}

// Starting a new dictionary
var newEntry = new Entry();

// The start function to set off when the app is run
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
            case "BEGIN":
                newEntry.begin();
                break;
            // case "PRINT":
            //     newEntry.print();
            //     break;
        };


    });
}

// Runs the function 
start();