var file  = require('./parsed.json');
var statez = require('./states.json');

var x = [];

for(var i in file) {
    var name = file[i].State;
    var medical = file[i].Medical;
    var decrim = file[i].Decriminalized;
    var psuedo = file[i].Pseudo;
    var legal = file[i].Legalized;
    var ab = statez[i].abbreviation;
    // console.log(medical);
    // console.log(file[i]);

    var obj = {};

    var myear = medical["Year"];
    var mstatus = medical["Status"];


    var dyear = decrim["Year"];
    var dstats = decrim["Status"];

    var pyear = psuedo["Year"];
    var pstats = psuedo["Status"];

    var lyear = legal["Year"];
    var lstats = legal["Status"];

    obj[ab] = {"State":name, "Medical" : {"Year":myear, "Status":mstatus}, "Decriminalized" : {"Year":dyear, "Status":dstats}, "Psuedo" :{"Year":pyear, "Status":pstats}, "Legalized":{"Year":lyear, "Status":lstats}};


    x.push(obj);
}

var fs = require('fs');

var output = './my.json';

fs.writeFile(output, JSON.stringify(x,null, 4), function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("sucess");
    }
})



