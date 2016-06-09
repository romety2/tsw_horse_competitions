/* jshint node: true, esnext: true */

var temp;
/* nowe zawody */
var zwNZak, zaw, sedz, fkLS, fkGr;

require('../models/startingList');

exports.index = (req, res) => {
    res.render('index', { user : req.user, login: req.isAuthenticated() });    
};

exports.kontakt = (req, res) =>  {
    res.render('pages/kontakt', { user : req.user, login: req.isAuthenticated() });    
};

exports.zgloszenie = (req, res) =>  {
    res.render('pages/zgloszenie', { user : req.user, login: req.isAuthenticated() });    
};

exports.pobierzZg = (req, res) =>  {
    res.download(__dirname + '/../public/file/zgloszenie.pdf');
};

exports.regulamin = (req, res) =>  {
    openPDF("/../public/file/regulamin.pdf", res);
};

exports.logowanie = (req, res) =>  {
    res.render('pages/logowanie', { user : req.user, login: req.isAuthenticated() });
};

exports.zaloguj = (req, res) =>  {
    res.redirect('/');
};

exports.wyloguj = (req, res) =>  {
    req.logout();
    res.redirect('/');
};

exports.zawody = (req, res) =>  {
    readZwNZak('../models/competition.js');
    readAllZaw('../models/player.js');
    res.render('pages/zawody', { user : req.user, login: req.isAuthenticated() });   
};

exports.grupy = (req, res) =>  {
    readZwNZak('../models/competition.js');
    readAllZaw('../models/player.js');
    readAllSedz('../models/user.js', 'Sędzia');
    res.render('pages/grupy', { user : req.user, login: req.isAuthenticated() }); 
};

exports.zawodnicy = (req, res) =>  {
    readAll('../models/player.js');
    res.render('pages/zawodnicy', { user : req.user, login: req.isAuthenticated() });   
};

exports.uzytkownicy = (req, res) =>  {
    readAll('../models/user.js');
    res.render('pages/uzytkownicy', { user : req.user, login: req.isAuthenticated() });   
};

exports.dodajZaw = (req, res) => {
    create(req.body, '../models/player.js');
    res.redirect('/zawodnicy');
};

exports.dodajUz = (req, res) => {
    createUser(req.body, '../models/user.js', '/uzytkownicy', req, res);
};

exports.dodajLS = (req, res) => {
    fkLS.push(create(req.body, '../models/startingList.js'));
    add3('../models/startingList.js', '../models/competition.js', 'ls');
};

exports.dodajGr = (req, res) => {
    fkGr.push(create(req.body, '../models/group.js'));
    add3('../models/group.js', '../models/competition.js', 'g');
};


exports.pobierzW = (req, res) =>  {
    res.json(pob());
};

exports.pobierzZwNDDZaw = (req, res) =>  {
    res.json(pobZwNDDZaw());
};

exports.pobierzWZaw = (req, res) =>  {
    res.json(pobZaw());
};

exports.pobierzZaw = (req, res) =>  {
    res.json(read(req.params.id)||readZaw(req.params.id));
};

exports.pobierzUz = (req, res) =>  {
    res.json(read(req.params.id));
};

exports.pobierzLSZwNZak = (req, res) => {
    res.json(pobLSZwNZak());
};

exports.pobierzLSZwNZakPlecWgGr = (req, res) => {
    res.json(pobLSZwNZakPlecWgGr(req.params.grupa));
};

exports.pobierzLSZwNZakGrWgGr = (req, res) => {
    res.json(pobLSZwNZakGrWgGr(req.params.grupa));
};

exports.pobierzSedziowNWGr = (req, res) =>  {
    res.json(pobierzSedziowNWGr(req.params.grupa));
};

exports.pobierzSedziowWGr = (req, res) =>  {
    res.json(pobierzSedziowWGr(req.params.grupa));
};

exports.pobierzZwNZak = (req, res) =>  {
    res.json(pobZwNZak());
};

exports.pobierzGrZwNZak = (req, res) => {
    res.json(pobGrZwNZak());
};

exports.pobierzSedziow = (req, res) =>  {
    res.json(pobSedz());
};

exports.edytujZw =(req, res) => {
    updateColumnZwNZak(req.body.dana, req.params.pole, '../models/competition.js');
};

exports.edytujZaw = (req, res) =>  {
    update(req.params.id, req.body, '../models/player.js');
    res.redirect('/zawodnicy');
};

exports.edytujUz = (req, res) =>  {
    update(req.params.id, req.body, '../models/user.js');
    res.redirect('/uzytkownicy');
};

exports.usunZaw = (req, res) =>  {
    delete2(req.params.id, '../models/player.js');
    res.redirect('/zawodnicy');
};

exports.usunUz = (req, res) =>  {
    delete2(req.params.id, '../models/user.js');
    res.redirect('/uzytkownicy');
};

exports.usunLS = (req, res) =>  {
    delete2(req.params.id, '../models/startingList.js');
    delete3('../models/startingList.js', req.params.id, 'ls');
};

exports.usunGr2 = (req, res) =>  {
    console.log('dd');
    delete3('../models/group.js', req.params.nazwa, 'g');
};

exports.zmienZawGrupa = (req, res) =>  {
    updateStatusZwNZak('dzielenie', '../models/competition.js');
    res.redirect('/grupy');
};

exports.wstawGr = (req, res) =>  {
    updateColumn(req.body._gr, 'gr', req.params.id, '../models/startingList.js');
    res.redirect('/grupy');
};

exports.usunGr = (req, res) =>  {
    updateColumn(req.params.id, 'gr2', req.params.id, '../models/startingList.js');
    res.redirect('/grupy');
};

exports.wstawSedz = (req, res) =>  {
    updateColumn(req.body.sedz, 'sedz', req.params.grupa, '../models/group.js');
    res.redirect('/grupy');
};

exports.usunSedz = (req, res) =>  {
    updateColumn(req.body.sedz, 'sedz2', req.params.grupa, '../models/group.js');
    res.redirect('/grupy');
};

var openPDF = (fp, res) => {
    var fs = require('fs');
    var filePath = fp;
    fs.readFile(__dirname + filePath ,  (err,data) => {
        res.contentType("application/pdf");
        res.send(data);
    });
};

var create = (object, schema) => {
    var O = require(schema);
    var o = new O(object);
    o.save();
    return o;
};

var read = (id) => {
    var underscore = require('underscore');
    return underscore.find(temp, (t) => { return t._id.toString() === id; });
};

var readZaw = (id) => {
    var underscore = require('underscore');
    return underscore.find(zaw, (z) => { return z._id.toString() === id; });
};

var readSedz = (id) => {
    var underscore = require('underscore');
    return underscore.find(sedz, (z) => { return z._id.toString() === id; });
};

var readAll = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        temp = o;
    });
};

var readAllZaw = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        zaw = o;
    });
};

var readAllSedz = (schema, rol) => {
    var O = require(schema);
    O.find({role: rol}).exec((err, o) => {
        sedz = o;
    });
};

var getFKZwNZak = (schema, pLS, pGr) => {
    var O = require(schema);
    if(zwNZak.etap === 'tworzenie')
    {
        O.findOne({etap: 'tworzenie'}).populate(pLS).exec((err, o) => {
            fkLS = o.ls;
        });
        O.findOne({etap: 'tworzenie'}).populate(pGr).exec((err, o) => {
            fkGr = o.grupy;
        });
    }
    else if(zwNZak.etap === 'dzielenie')
    {
        O.findOne({etap: 'dzielenie'}).populate(pLS).exec((err, o) => {
            fkLS = o.ls;
        });
        O.findOne({etap: 'dzielenie'}).populate(pGr).exec((err, o) => {
            fkGr = o.grupy;
        });
    }
};

var update = (id, object, schema) => {
    var O = require(schema);
    O.update({_id: id}, {$set: object}, () => {});    
};

var delete2 = (id, schema) => {
    var O = require(schema);
    O.remove(O.find({_id: id})).exec();
};

var add3 = (schema, schema2, type) => {
    var O = require(schema);
    var O2 = require(schema2);
    if(type === 'ls')
    {
        O.find((err, o) => {
            zwNZak.ls.push(o[o.length-1]);
            O2.update({_id: zwNZak._id}, {$set: {ls: zwNZak.ls}}, () => {});    
        });   
    }
    else if(type === 'g')
    {
        O.find((err, o) => {
            zwNZak.grupy.push(o[o.length-1]);
            O2.update({_id: zwNZak._id}, {$set: {grupy: zwNZak.grupy}}, () => {});    
        }); 
    }
};

var delete3 = (schema, id, type) => {
    var O = require(schema);
    if(type === 'ls')
        O.remove(O.find({_zaw: id})).exec();
    else if(type === 'g')
        O.remove(O.find({nazwa: id})).exec();
};

var readZwNZak = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        var underscore = require('underscore');
        zwNZak = underscore.find(o, () => { return o.etap !== 'zakonczone'; }) || '';
        if(zwNZak === '')
        {
            create({wydarzenie: '', opis: '', zakres: '10', rodzaj: 'c', etap: 'tworzenie'}, '../models/competition.js');
            zwNZak = {wydarzenie: '', opis: '', zakres: '10', rodzaj: 'c', etap: 'tworzenie', ls: []};
            fkLS = [];
        }
        else
        {
            getFKZwNZak('../models/competition.js' ,'ls', 'grupy');
        }
    });
};

var createUser = (object, schema, redirect, req, res) => {
    var User = require(schema);
    User.register(new User({imie : object.imie, nazwisko: object.nazwisko, username: object.username, role: object.role}), object.password, (err, user) => {
        if (err)
            return res.render('pages/uzytkownicy', { user : user });
    res.redirect(redirect);
    });
};

var updateColumnZwNZak = (value, poleID, schema) => {
    var O = require(schema);
    if(poleID==="wydarzenieZ")
        O.update({_id: zwNZak._id}, {$set: {wydarzenie: value}}, () => {});  
    else if(poleID==="opisZ")
        O.update({_id: zwNZak._id}, {$set: {opis: value}}, () => {});  
    else if(poleID==="radio1Z")
        O.update({_id: zwNZak._id}, {$set: {zakres: value}}, () => {});  
    else if(poleID==="radio2Z")
        O.update({_id: zwNZak._id}, {$set: {zakres: value}}, () => {});  
    else if(poleID==="radio1R")
        O.update({_id: zwNZak._id}, {$set: {rodzaj: value}}, () => {});  
    else if(poleID==="radio2R")
        O.update({_id: zwNZak._id}, {$set: {rodzaj: value}}, () => {});
};

var updateColumn = (value, poleID, id, schema) => {
    var O = require(schema);
    var underscore = require("underscore");
    var pmLS, pmGr, pm;
    var tb = [];
    if(poleID==="gr")
    {
        O.update({_id: underscore.find(fkLS, (ls) => {return ls._zaw.toString() === id;})._id}, {$set: {_gr: underscore.find(fkGr, (g) => {return g.nazwa === value;})._id}}, () => {});
        pmLS = underscore.keys(underscore.indexBy(fkLS, "_zaw"));
        pmGr = underscore.keys(underscore.indexBy(fkGr, "nazwa"));
        fkLS[underscore.indexOf(pmLS, id)]._gr=fkGr[underscore.indexOf(pmGr, value)]._id;

    }
    else if(poleID==="gr2")
    {
        O.update({_id: underscore.find(fkLS, (ls) => {return ls._zaw.toString() === id;})._id}, {$set: {_gr: id}}, () => {});
        pmLS = underscore.keys(underscore.indexBy(fkLS, "_zaw"));
        fkLS[underscore.indexOf(pmLS, id)]._gr=id;
    }
    else if(poleID==="sedz")
    {
        tb = underscore.find(fkGr, (g) => {return g.nazwa === id;}).sedziowie;
        tb.push(underscore.find(sedz, (s) => {return s._id.toString() === value;}));
        O.update({_id: underscore.find(fkGr, (g) => {return g.nazwa === id;})._id},
        {$set: {sedziowie: tb}}, () => {});
        pmGr = underscore.keys(underscore.indexBy(fkGr, "nazwa"));
        fkGr[underscore.indexOf(pmGr, id)].sedziowie=tb;
    }
    else if(poleID==="sedz2")
    {
        console.log('dd');
        tb = underscore.find(fkGr, (g) => {return g.nazwa === id;}).sedziowie;
        pm = tb.indexOf(value);
        if (pm >= 0)
          tb.splice(pm, 1);
        console.log(tb);
        O.update({_id: underscore.find(fkGr, (g) => {return g.nazwa === id;})._id},
        {$set: {sedziowie: tb}}, () => {});
        pmGr = underscore.keys(underscore.indexBy(fkGr, "nazwa"));
        fkGr[underscore.indexOf(pmGr, id)].sedziowie=tb;
    }
};

var updateStatusZwNZak = (etap, schema) => {
    var O = require(schema);
    O.update({_id: zwNZak._id}, {$set: {etap: etap}}, () => {});    
};

var pob = () => {
    var underscore = require("underscore");
    return underscore.sortBy(temp, (t) => { return t.nazwa || t.username;});
};

var pobZaw = () => {
    var underscore = require("underscore");
    return underscore.sortBy(zaw, (z) => {return z.nazwa;});
};

var pobSedz = () => {
    var underscore = require("underscore");
    return underscore.sortBy(sedz, (s) => {return s.nazwisko+s.imie;} );
};

var pobZwNZak = () => {
    return zwNZak;
};

var pobLSZwNZak = () => {
    var underscore = require("underscore");
    if(typeof fkLS !== 'undefined')
        return underscore.sortBy(fkLS, (f) => {return f.nrStartowy;});
    else
        return {} ;
};

var pobLSZwNZakPlecWgGr = (nGr) => {
    var underscore = require("underscore");
    var g;
    if(typeof fkLS !== 'undefined' && typeof fkGr !== 'undefined' )
    {
        g = underscore.find(fkGr, (f) => {return f.nazwa === nGr;});
        return underscore.filter(fkLS, (f) => {return g.plec === f.plec && f._zaw.toString() === f._gr.toString();});
    }
    else
        return {} ;
};

var pobLSZwNZakGrWgGr = (nGr) => {
    var underscore = require("underscore");
    var g;
    if(typeof fkLS !== 'undefined' && typeof fkGr !== 'undefined' )
    {
        g = underscore.find(fkGr, (f) => {return f.nazwa === nGr;});
        return underscore.filter(fkLS, (f) => {return f._gr.toString() === g._id.toString();});
    }
    else
        return {};
};

var pobierzSedziowNWGr = (nGr) => {
    var underscore = require("underscore");
    var g;
    if(typeof fkLS !== 'undefined' && typeof fkGr !== 'undefined' )
    {
        g = underscore.find(fkGr, (f) => {return f.nazwa === nGr;});
        return underscore.sortBy(underscore.filter(sedz, (s) => {return g.sedziowie.indexOf(s._id.toString()) === -1;}), (f) => {return f.nazwisko+f.imie;});
    }
    else
        return {};
};

var pobierzSedziowWGr = (nGr) => {
    var underscore = require("underscore");
    var g;
    if(typeof fkLS !== 'undefined' && typeof fkGr !== 'undefined' )
    {
        g = underscore.find(fkGr, (f) => {return f.nazwa === nGr;});
        return underscore.sortBy(underscore.filter(sedz, (s) => {return g.sedziowie.indexOf(s._id.toString()) !== -1;}), (f) => {return f.nazwisko+f.imie;});
    }
    else
        return {};
};

var pobGrZwNZak = () => {
    var underscore = require("underscore");
    if(typeof fkGr !== 'undefined')
        return underscore.sortBy(fkGr, (f) => {return f.nazwa;});
    else
        return {} ;
};

var pobZwNDDZaw = () => {
    var underscore = require("underscore");
    var pm;
    if(typeof fkLS !== 'undefined')
        {   
            pm = underscore.keys(underscore.indexBy(fkLS, "_zaw"));
            return underscore.sortBy(underscore.filter(zaw, (z) => { return pm.indexOf(z._id.toString()) === -1; }), (f) => {return f.nazwa;});
        }
    else
        return underscore.sortBy(zaw, (z) => {return z.nazwa;}); 
};