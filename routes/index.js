/* jshint node: true, esnext: true */

var temp;
/* nowe zawody */
var zwNZak, zaw, sedz, fkLS, fkGr, fkOc;
/* ustawienia zawodów */
var zwNZak2, sedz2, fkLS2, fkGr2, fkOc2;
/* livescore */
var zwNZak3, sedz3, fkLS3, fkGr3, fkOc3;

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

exports.glosowanie = (req, res) =>  {
    readZwNZak('../models/competition.js');
    readAllZaw('../models/player.js');
    readAllSedz('../models/user.js', 'Sędzia');
    res.render('pages/glosowanie', { user : req.user, login: req.isAuthenticated() });    
};

exports.livescore = (req, res) => {
    readZwNZak3('../models/competition.js');
    readAllSedz3('../models/user.js', 'Sędzia');
    res.render('pages/livescore', { user : req.user, login: req.isAuthenticated() });  
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
    updateNS(req.params.id, '../models/startingList.js');
    delLSWZw(req.params.id);
    delfkLS(req.params.id);
    delete3('../models/startingList.js', req.params.id, 'ls');
};

exports.usunGr2 = (req, res) =>  {
    updateNG(req.params.nazwa, '../models/group.js');
    delGrWLS(req.params.nazwa);
    delGrWZw(req.params.nazwa);
    delfkGr(req.params.nazwa);
    delete3('../models/group.js', req.params.nazwa, 'g');
};

exports.zmienZawGrupa = (req, res) =>  {
    updateStatusZwNZak('dzielenie', '../models/competition.js');
    res.redirect('/grupy');
};

exports.zmienZawGlos = (req, res) =>  {
    updateStatusZwNZak('rozpoczete', '../models/competition.js');
    createTableNotes('../models/notes.js', '../models/competition.js');
};

exports.zmienStatusWG = (req, res) => {
    updateStatusOc('../models/notes.js', req.params.nazwa ,'wg');
};

exports.zmienStatusOc = (req, res) => {
    updateStatusOc('../models/notes.js', req.params.id ,'o');
};

exports.zmienStatusZak = (req, res) => {
    updateStatusOc('../models/notes.js', '' ,'z');
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

exports.zmienKolNS = (req, res) =>  {
    changeOrderNS(req.params.id1, req.params.id2, '../models/startingList.js');
};

exports.walidacjaGr = (req, res) =>  {
    res.json(validationGr());
};

exports.ocenianie = (req, res) =>  {
    readZwNZak2('../models/competition.js');
    readAllSedz2('../models/user.js', 'Sędzia');
    res.render('pages/ocenianie', { user : req.user, login: req.isAuthenticated() });
};

exports.pobUst = (req, res) => {
    res.json(pobUst('../models/competition.js'));
};

exports.zapiszOceny = (req, res) => {
    zapOcene(req.params.t, req.params.g,  req.params.k,  req.params.n,  req.params.r, req.params.sedzia, req.params.ns, '../models/notes.js');
};

exports.sprCzyNieOceniam = (req, res) => {
    res.json(sprPlayerOInLogin(req.params.login));
};

exports.pobierzGrNieUzyte = (req, res) => {
    res.json(pobGrNieUzyte());
};

exports.pobierzGrWUzyciu = (req, res) => {
    res.json(pobGrWUzyciu());
};

exports.pobierzNazweGrZLS = (req, res) => {
    res.json(pobNazweGrZLS(req.params.id));
};

exports.pobierzOcenianegoLS = (req, res) => {
    res.json(pobOcenianegoLS());
};

exports.pobierzNazweIOpisNzNZak = (req, res) => {
    res.json(pobNazweIOpisNzNZak());
};

exports.pobierzRanking = (req, res) => {
    res.json(pobRanking());
};

exports.jeszczeRazRanking = (req, res) => {
    res.json(pobJeszczeRazRanking(req.params.t, req.params.g, req.params.k, req.params.n, req.params.r, req.params.ns, req.params.l));
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

var getFKZwNZak = (schema, pLS, pGr, pOc) => {
    var O = require(schema);
    if(zwNZak.etap === 'tworzenie')
    {
        O.findOne({etap: 'tworzenie'}).populate(pLS).exec((err, o) => {
            fkLS = o.ls;
        });
        O.findOne({etap: 'tworzenie'}).populate(pGr).exec((err, o) => {
            fkGr = o.grupy;
        });
        O.findOne({etap: 'tworzenie'}).populate(pOc).exec((err, o) => {
            fkOc = o.oceny;
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
        O.findOne({etap: 'dzielenie'}).populate(pOc).exec((err, o) => {
            fkOc = o.oceny;
        });
    }
    else if(zwNZak.etap === 'rozpoczete')
    {
        O.findOne({etap: 'rozpoczete'}).populate(pLS).exec((err, o) => {
            fkLS = o.ls;
        });
        O.findOne({etap: 'rozpoczete'}).populate(pGr).exec((err, o) => {
            fkGr = o.grupy;
        });
        O.findOne({etap: 'rozpoczete'}).populate(pOc).exec((err, o) => {
            fkOc = o.oceny;
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

var delGrWLS = (nazwa) => {
    var underscore = require('underscore');
    var id = underscore.find(fkGr, (g) => { return g.nazwa === nazwa; })._id;
    underscore.map(underscore.filter(fkLS, (ls) => { return ls._gr.toString() === id.toString();}), (ls2) => { return updateColumn(ls2._zaw.toString(), 'gr2', ls2._zaw.toString(), '../models/startingList.js');});
};

var delLSWZw = (id) => {
    var underscore = require('underscore');
    updateColumn(zwNZak._id, 'zw', id, '../models/competition.js');  
};

var delGrWZw = (id) => {
    var underscore = require('underscore');
    updateColumn(zwNZak._id, 'zw2', id, '../models/competition.js');  
};

var delfkLS = (id) => {
    var underscore = require('underscore');
    var tb = underscore.keys(underscore.indexBy(fkLS, "_zaw"));
    var pm = tb.indexOf(id);
    if (pm >= 0)
        fkLS.splice(pm, 1);
};

var delfkGr = (id) => {
    var underscore = require('underscore');
    var tb = underscore.keys(underscore.indexBy(fkGr, "nazwa"));
    var pm = tb.indexOf(id);
    if (pm >= 0)
        fkGr.splice(pm, 1);
};

var readZwNZak = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        var underscore = require('underscore');
        zwNZak = underscore.find(o, () => { return o.etap !== 'zakonczone'; }) || '';
        if(zwNZak === '')
        {
            zwNZak = create({wydarzenie: '', opis: '', zakres: '10', rodzaj: 'c', is: '1', etap: 'tworzenie'}, '../models/competition.js');
            fkLS = [];
        }
        else
        {
            getFKZwNZak('../models/competition.js' ,'ls', 'grupy', 'oceny');
        }
    });
};

var readZwNZak2 = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        var underscore = require('underscore');
        zwNZak2 = underscore.find(o, () => { return o.etap !== 'zakonczone'; }) || '';
        if(zwNZak2 !== '')
             getFKZwNZak2('../models/competition.js' ,'ls', 'grupy', 'oceny');
    });
};

var getFKZwNZak2 = (schema, pLS, pGr, pOc) => {
    var O = require(schema);
    if(zwNZak2.etap === 'tworzenie')
    {
        O.findOne({etap: 'tworzenie'}).populate(pLS).exec((err, o) => {
            fkLS2 = o.ls;
        });
        O.findOne({etap: 'tworzenie'}).populate(pGr).exec((err, o) => {
            fkGr2 = o.grupy;
        });
        O.findOne({etap: 'tworzenie'}).populate(pOc).exec((err, o) => {
            fkOc2 = o.oceny;
        });
    }
    else if(zwNZak2.etap === 'dzielenie')
    {
        O.findOne({etap: 'dzielenie'}).populate(pLS).exec((err, o) => {
            fkLS2 = o.ls;
        });
        O.findOne({etap: 'dzielenie'}).populate(pGr).exec((err, o) => {
            fkGr2 = o.grupy;
        });
        O.findOne({etap: 'dzielenie'}).populate(pOc).exec((err, o) => {
            fkOc2 = o.oceny;
        });
    }
    else if(zwNZak2.etap === 'rozpoczete')
    {
        O.findOne({etap: 'rozpoczete'}).populate(pLS).exec((err, o) => {
            fkLS2 = o.ls;
        });
        O.findOne({etap: 'rozpoczete'}).populate(pGr).exec((err, o) => {
            fkGr2 = o.grupy;
        });
        O.findOne({etap: 'rozpoczete'}).populate(pOc).exec((err, o) => {
            fkOc2 = o.oceny;
        });
    }
};

var readAllSedz2 = (schema, rol) => {
    var O = require(schema);
    O.find({role: rol}).exec((err, o) => {
        sedz2 = o;
    });
};

var readZwNZak3 = (schema) => {
    var O = require(schema);
    O.find((err, o) => {
        var underscore = require('underscore');
        zwNZak3 = underscore.find(o, () => { return o.etap !== 'zakonczone'; }) || '';
        if(zwNZak3 !== '')
             getFKZwNZak3('../models/competition.js' ,'ls', 'grupy', 'oceny');
    });
};

var getFKZwNZak3 = (schema, pLS, pGr, pOc) => {
    var O = require(schema);
    if(zwNZak3.etap === 'tworzenie')
    {
        O.findOne({etap: 'tworzenie'}).populate(pLS).exec((err, o) => {
            fkLS3 = o.ls;
        });
        O.findOne({etap: 'tworzenie'}).populate(pGr).exec((err, o) => {
            fkGr3 = o.grupy;
        });
        O.findOne({etap: 'tworzenie'}).populate(pOc).exec((err, o) => {
            fkOc3 = o.oceny;
        });
    }
    else if(zwNZak3.etap === 'dzielenie')
    {
        O.findOne({etap: 'dzielenie'}).populate(pLS).exec((err, o) => {
            fkLS3 = o.ls;
        });
        O.findOne({etap: 'dzielenie'}).populate(pGr).exec((err, o) => {
            fkGr3 = o.grupy;
        });
        O.findOne({etap: 'dzielenie'}).populate(pOc).exec((err, o) => {
            fkOc3 = o.oceny;
        });
    }
    else if(zwNZak3.etap === 'rozpoczete')
    {
        O.findOne({etap: 'rozpoczete'}).populate(pLS).exec((err, o) => {
            fkLS3 = o.ls;
        });
        O.findOne({etap: 'rozpoczete'}).populate(pGr).exec((err, o) => {
            fkGr3 = o.grupy;
        });
        O.findOne({etap: 'rozpoczete'}).populate(pOc).exec((err, o) => {
            fkOc3 = o.oceny;
        });
    }
};

var readAllSedz3 = (schema, rol) => {
    var O = require(schema);
    O.find({role: rol}).exec((err, o) => {
        sedz3 = o;
    });
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
    else if(poleID==="is")
        O.update({_id: zwNZak._id}, {$set: {is: value}}, () => {});
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
        tb = underscore.find(fkGr, (g) => {return g.nazwa === id;}).sedziowie;
        pm = tb.indexOf(value);
        if (pm >= 0)
          tb.splice(pm, 1);
        O.update({_id: underscore.find(fkGr, (g) => {return g.nazwa === id;})._id},
        {$set: {sedziowie: tb}}, () => {});
        pmGr = underscore.keys(underscore.indexBy(fkGr, "nazwa"));
        fkGr[underscore.indexOf(pmGr, id)].sedziowie=tb;
    }
    else if(poleID==="zw")
    {
        id = underscore.find(fkLS, (ls) => {return ls._zaw.toString() === id.toString();})._id;
        tb = zwNZak.ls;
        pm = tb.indexOf(id);
        if (pm >= 0)
          tb.splice(pm, 1);
        O.update({_id: value}, {$set: {ls: tb}}, () => {});
        zwNZak.ls=tb;
    }
    else if(poleID==="zw2")
    {
        id = underscore.find(fkGr, (g) => {return g.nazwa === id.toString();})._id;
        tb = zwNZak.grupy;
        pm = tb.indexOf(id);
        if (pm >= 0)
          tb.splice(pm, 1);
        O.update({_id: value}, {$set: {grupy: tb}}, () => {});
        zwNZak.gr=tb;
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
        return underscore.sortBy(underscore.filter(fkLS, (f) => {return g.plec === f.plec && f._zaw.toString() === f._gr.toString();}), (f) => {return f.nrStartowy;});
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
        return underscore.sortBy(underscore.filter(fkLS, (f) => {return f._gr.toString() === g._id.toString();}), (f) => {return f.nrStartowy;});
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

var updateNS = (id, schema) => {
    var underscore = require("underscore");
    var O = require(schema);
    var ns = underscore.find(fkLS, (f) => {return f._zaw.toString() === id.toString();}).nrStartowy;
    var i;
    for(i = 0; i < fkLS.length; i++)
    {
        if(parseInt(fkLS[i].nrStartowy) > parseInt(ns))
        {
            O.update({_id: fkLS[i]._id}, {$set: {nrStartowy: parseInt(fkLS[i].nrStartowy) - 1}}, () => {});
            fkLS[i].nrStartowy--;
        }
    }  
};

var updateNG = (id, schema) => {
    var underscore = require("underscore");
    var O = require(schema);
    var ng = underscore.find(fkGr, (g) => {return g.nazwa === id.toString();}).nazwa.substring(5);
    var i;
    var nng = underscore.map(fkGr, (g) => { return parseInt(g.nazwa.substring(5)) > parseInt(ng) ? 'Grupa '+(parseInt(g.nazwa.substring(5)) - 1).toString() : g.nazwa; });
    for(i = parseInt(ng); i < fkGr.length; i++)
    {
        fkGr[i].nazwa = nng[i];
        O.update({_id: fkGr[i]._id}, {$set: {nazwa: nng[i]}}, () => {});
    }
};

var changeOrderNS = (id1, id2, schema) => {
    var underscore = require("underscore");
    var ns1 = (parseInt(underscore.find(fkLS, (f) => {return f._zaw.toString() === id1.toString();}).nrStartowy)-1).toString();
    var ns2 = (parseInt(underscore.find(fkLS, (f) => {return f._zaw.toString() === id2.toString();}).nrStartowy)+1).toString();
    var O = require(schema);
    var pmLS, pmGr;
    O.update({_zaw: id1}, {$set: {nrStartowy: ns1}}, () => {});
    O.update({_zaw: id2}, {$set: {nrStartowy: ns2}}, () => {});
    pmLS = underscore.keys(underscore.indexBy(fkLS, "_zaw"));
    fkLS[underscore.indexOf(pmLS, id1)].nrStartowy=ns1;
    fkLS[underscore.indexOf(pmLS, id2)].nrStartowy=ns2;
};

var validationGr = () => {
    var underscore = require("underscore");
    var tb = underscore.keys(underscore.indexBy(fkLS, "_gr"));
    var pm;
    if(fkGr.length === 0)
        return "Musisz utworzyć jakąś grupę!";
    else if(!underscore.every(fkGr, (g) => { return tb.indexOf(g._id.toString()) !== -1;}))
    {
          return underscore.find(fkGr, (g) => { return tb.indexOf(g._id.toString()) === -1; }).nazwa+": jest pusta dodaj do niej zawodników lub usuń grupę!";  
    }
    else if(!underscore.every(fkGr, (g) => { return g.sedziowie.length === parseInt(zwNZak.is); }))
    {
        return underscore.find(fkGr, (g) => { return g.sedziowie.length !== parseInt(zwNZak.is); }).nazwa+": liczba siędziów nie jest równa "+zwNZak.is+"!";
    }
    else if(!underscore.every(fkLS, (ls) => { return ls._zaw.toString() !== ls._gr.toString(); }))
    {
        pm = underscore.find(fkLS, (ls) => { return ls._zaw.toString() === ls._gr.toString(); });
        return "Zawodnik: "+pm.nrStartowy+". "+pm.nazwa+" ("+pm.plec+") - "+pm.imie+" "+pm.nazwisko+", nie został dodany do żadnej grupy!";     
    }
    return '';
};

var createTableNotes = (schema , s2) =>
{
    var i, j, k, tb = [], dl;
    var underscore = require("underscore");
    var f = (ls) => { return ls._gr.toString() === fkGr[i]._id.toString();};
    var O = require(s2);
    if(zwNZak.oceny.length === 0)
    {
        for(i = 0; i < fkGr.length; i++)
        {
            tb = underscore.filter(fkLS, f);
            dl = tb.length;
            for(j = 0; j < dl; j++)
                for(k = 0; k < zwNZak.is; k++)
                    zwNZak.oceny.push(create({typ: '', glowa: '', kloda: '', nogi: '', ruch: '', status: 'n', sedzia: fkGr[i].sedziowie[k].toString(), zawodnik: tb[j]._id.toString(),}, '../models/notes.js'));
        }
        O.update({_id: zwNZak._id}, {$set: {oceny: zwNZak.oceny}}, () => {});
    }
};

var pobUst = (schema) =>
{
    if(zwNZak2 !== '')
        return {zakres: zwNZak2.zakres, rodzaj: zwNZak2.rodzaj};
    else
        return '';
};

var updateStatusOc = (schema, grupa, status) =>
{
    var underscore = require('underscore');
    var id, pm, i, j;
    var O = require(schema);
    if(status === 'wg')
    {
        id = underscore.find(fkGr, (g) => { return g.nazwa === grupa; })._id;
        pm = underscore.keys(underscore.indexBy(underscore.filter(fkLS, (ls) => { return ls._gr.toString() === id.toString();}), "_id"));
        underscore.map(fkOc, (oc) => { return pm.indexOf(oc.zawodnik.toString()) !== -1 ? oc.status = 'wg' : oc ;});
        pm = underscore.filter(fkOc, (ls) => { return ls.status === 'wg';});
        for(i = 0; i < pm.length; i++)
            O.update({_id: pm[i]._id}, {$set: {status: 'wg'}}, () => {});
    }
    else if(status === 'o')
    {
        id = underscore.find(fkLS, (ls) => { return ls._zaw.toString() === grupa; })._id;
        id = underscore.filter(fkOc, (o) => { return o.zawodnik.toString() === id.toString(); });
        i = underscore.keys(underscore.indexBy(fkOc, "_id"));
        for(j = 0; j < id.length; j++)
        {
            fkOc[i.indexOf(id[j]._id.toString())].status='o';
            O.update({_id: id[j]._id}, {$set: {status: 'o'}}, () => {});
        }
    }
    else if(status === 'z')
    {
        id = underscore.filter(fkOc, (o) => { return o.status.toString() === 'o'; });
        i = underscore.keys(underscore.indexBy(fkOc, "_id"));
        for(j = 0; j < id.length; j++)
        {
            fkOc[i.indexOf(id[j]._id.toString())].status='z';
            O.update({_id: id[j]._id}, {$set: {status: 'z'}}, () => {});
        }
    }
};

var zapOcene = (t, g, k, n, r, login, ns, schema) =>
{
    var id, i;
    var O = require(schema);
    var underscore = require('underscore');
    var idS = underscore.find(sedz, (s) => { return s.username === login; })._id;
    var idLS = underscore.find(fkLS, (ls) => { return ls.nrStartowy === ns; })._id;
    O.update({zawodnik: idLS, sedzia: idS}, {$set: {typ: t, glowa: g, kloda: k, nogi: n, ruch: r}}, () => {});
    id = underscore.find(fkOc, (o) => { return o.zawodnik.toString() === idLS.toString() && o.sedzia.toString() === idS.toString(); })._id;
    i = underscore.keys(underscore.indexBy(fkOc, "_id"));
    fkOc[i.indexOf(id.toString())].typ=t;
    fkOc[i.indexOf(id.toString())].glowa=g;
    fkOc[i.indexOf(id.toString())].kloda=k;
    fkOc[i.indexOf(id.toString())].nogi=n;
    fkOc[i.indexOf(id.toString())].ruch=r;
};

var sprPlayerOInLogin = (login) =>
{
    var underscore = require('underscore');
    var status = underscore.filter(fkOc2, (o2) => { return o2.status === 'o'; });
    var user, zaw, gr, i;
    var fLS = (ls2) => { return ls2._id.toString() === status[i].zawodnik.toString();};
    var fGr = (gr2) => { return gr2._id.toString() === zaw._gr.toString();}; 
    if(status.length !== 0)
    {
        user = underscore.find(sedz2, (s2) => { return s2.username === login; });
        for(i = 0; i < status.length; i++)
            if(user._id.toString() === status[i].sedzia.toString())
            {
                zaw = underscore.find(fkLS2, fLS);
                gr = underscore.find(fkGr2, fGr);
                i = status.length;
                return {ns: zaw.nrStartowy, grupa: gr.nazwa};
            }
    }
    return '';
};

var pobGrNieUzyte = () =>
{
    var i;
    var underscore = require('underscore');
    var pm = underscore.filter(fkOc, (o) => { return o.status === 'n'; });
    var f = (ls) => { return pm[i] === ls._id.toString(); };
    var f2 = (g) => { return gr[i] === g._id.toString(); };
    var gr = [], data = [];
    pm = underscore.keys(underscore.indexBy(pm, "zawodnik"));
    for(i = 0; i < pm.length; i++)
        gr.push(underscore.find(fkLS, f)._gr.toString());
    gr = underscore.uniq(gr);
    for(i = 0; i < gr.length; i++)
        data.push(underscore.find(fkGr, f2));
    return underscore.sortBy(data, 'nazwa');
};

var pobGrWUzyciu = () =>
{
    var i;
    var underscore = require('underscore');
    var pm = underscore.filter(fkOc, (o) => { return o.status === 'wg'; });
    var f = (ls) => { return pm[i] === ls._id.toString(); };
    var data = [];
    pm = underscore.keys(underscore.indexBy(pm, "zawodnik"));
    for(i = 0; i < pm.length; i++)
        data.push(underscore.find(fkLS, f));
    return underscore.sortBy(data, 'nrStartowe');
};

var pobNazweGrZLS = (id) =>
{
    var i;
    var underscore = require('underscore');
    var pm = underscore.find(fkLS, (ls) => { return ls._id.toString() === id.toString() ;});
    return(underscore.find(fkGr, (gr) => { return gr._id.toString() === pm._gr.toString() ;}));
};

var pobOcenianegoLS = () =>
{
    var i;
    var underscore = require('underscore');
    var pm = underscore.find(fkOc, (o) => { return o.status === 'o'; }) || '';
    if(pm !== '')
        return underscore.find(fkLS, (ls) => { return ls._id.toString() === pm.zawodnik.toString(); }) || '';
    return '';
};

var pobNazweIOpisNzNZak = () => {
    if(zwNZak3 !== '')
        return {nazwa: zwNZak3.wydarzenie, opis: zwNZak3.opis};
    else
        return '';
};

var pobRanking = () => {
    var tb, tb2, tb3, uz, i, j, sr=0, srt=0, srg=0, srk=0, srn=0, srr=0, ile=0;
    var data = [];
    var f = (t) => { return t.zawodnik.toString() === tb2[i];};
    var f2 = (ls) => { return ls._id.toString() === tb2[i]; };
    var underscore = require('underscore');
    if(zwNZak3 !== '')
    {
        tb = underscore.filter(fkOc3, (o3) => { return o3.status.toString() === 'z';});
        tb2 = underscore.uniq(underscore.keys(underscore.indexBy(tb, "zawodnik")));
        for(i = 0; i < tb2.length; i++)
        {
            sr=0;
            srt=0;
            srg=0;
            srk=0;
            srn=0;
            srr=0;
            ile=0;
            tb3 = underscore.filter(tb, f);
            for(j = 0; j < tb3.length; j++)
            {
                srt += parseFloat(tb3[j].typ);
                srg += parseFloat(tb3[j].glowa);
                srk += parseFloat(tb3[j].kloda);
                srn += parseFloat(tb3[j].nogi);
                srr += parseFloat(tb3[j].ruch);
                ile++;
            }
            srt /= ile;
            srg /= ile;
            srk /= ile;
            srn /= ile;
            srr /= ile;
            sr = (srt + srg + srk +srn + srr)/5;
            uz = underscore.find(fkLS3, f2);
            data.push({miejsce: 0, nazwa: uz.nazwa, hodowca: uz.imie+' '+uz.nazwisko, typ: srt, glowa: srg, kloda: srk, nogi: srn, ruch: srr, wynik: sr});
        }
        data = underscore.sortBy(data, 'wynik', 'typ', 'ruch').reverse();
        for(i = 0; i < data.length; i++)
            data[i].miejsce=i+1;
        return data;
    }
    else
        return '';
};

var pobJeszczeRazRanking = (t,g,k,n,r,ns,l) => {
    /*var tb, tb2, tb3, uz, uz1, uz2, i, j, id, sr=0, srt=0, srg=0, srk=0, srn=0, srr=0, ile=0;
    var data = [];
    var f = (t) => { return t.zawodnik.toString() === tb2[i];};
    var f2 = (ls) => { return ls._id.toString() === tb2[i]; };
    var underscore = require('underscore');
    uz1 = underscore.find(fkLS3, (ls) => { return ls.nrStartowy.toString() === ns; })._id;
    uz2 = underscore.find(sedz3, (s) => { return s.username.toString() === l; })._id;
    id = underscore.find(fkOc3, (o) => { return o.zawodnik.toString() === uz1.toString() && o.sedzia.toString() === uz2.toString(); })._id;
    i = underscore.keys(underscore.indexBy(fkOc3, "_id"));
    fkOc3[i.indexOf(id.toString())].typ=t;
    fkOc3[i.indexOf(id.toString())].glowa=g;
    fkOc3[i.indexOf(id.toString())].kloda=k;
    fkOc3[i.indexOf(id.toString())].nogi=n;
    fkOc3[i.indexOf(id.toString())].ruch=r;
    if(underscore.every(tb, (t) => { return t.typ !== '';}))
    {
        console.log('dziala');     
    }*/
    //fkOc3.push({typ: t, glowa: g, kloda: k, nogi: n, ruch: r, status: '', sedzia: null, zawodnik: uz1._id});
    /*if(zwNZak3 !== '')
    {
        tb = underscore.filter(fkOc3, (o3) => { return o3.status.toString() === 'z';});
        tb2 = underscore.uniq(underscore.keys(underscore.indexBy(tb, "zawodnik")));
        for(i = 0; i < tb2.length; i++)
        {
            sr=0;
            srt=0;
            srg=0;
            srk=0;
            srn=0;
            srr=0;
            ile=0;
            tb3 = underscore.filter(tb, f);
            for(j = 0; j < tb3.length; j++)
            {
                srt += parseFloat(tb3[j].typ);
                srg += parseFloat(tb3[j].glowa);
                srk += parseFloat(tb3[j].kloda);
                srn += parseFloat(tb3[j].nogi);
                srr += parseFloat(tb3[j].ruch);
                ile++;
            }
            srt /= ile;
            srg /= ile;
            srk /= ile;
            srn /= ile;
            srr /= ile;
            sr = (srt + srg + srk +srn + srr)/5;
            uz = underscore.find(fkLS3, f2);
            data.push({miejsce: 0, nazwa: uz.nazwa, hodowca: uz.imie+' '+uz.nazwisko, typ: srt, glowa: srg, kloda: srk, nogi: srn, ruch: srr, wynik: sr});
        }
        data = underscore.sortBy(data, 'wynik', 'typ', 'ruch').reverse();
        for(i = 0; i < data.length; i++)
            data[i].miejsce=i+1;
        return data;
    }
    else
        return '';*/
};