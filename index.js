const fs = require('fs');
const express = require('express');
const path = require('path');
const readDirFiles = require('read-dir-files');
const app = express();

const defaultDir = '../customWidget/src/app/';

const htmlComponents = readDirFiles.list(defaultDir, (err, filenames) => {
    if (err) return err;
    filenames.map((filename) => {
        if(filename.includes('.html')) {
            const breakDir = filename.split('/');
            const url = breakDir[breakDir.length-1];

            app.get(`/${url}`, (err, res) => {
                fs.readFile(filename, 'utf-8', (err, data) => res.send(path.join(__dirname, filename)));
                // res.send(path.join(__dirname, filename));
            });
        }
    });
});

app.listen(3000, () => console.log('Node is ready'));

// CLient Widget
class Widget {
    constructor({clientId, auth, widget, template, style}) {
        this.clientId = clientId;
        this.auth = auth;
        this.widget = widget;
        this.template = template;
        this.style = style;
    }

    app() {
        return {
            initialize: () => console.log(this.widget),
            auth: () => console.log(this.auth, this.clientId),
            template: () => {
                if(this.template !== 0) {
                    console.log(this.template);
                }
            },
            styled: () => {
                if (typeof this.style === 'object') {
                    console.log(this.style);
                }
            }
        }
    }
};

const w = new Widget({
    clientId: 'xxx-xxx-xxxx',
    auth: 'OAtuth2.0',
    widget: '/faturamento/widget-cartao-de-credito',
    template: 1,
    style: {
        bgParent: {
            backgroundColor: '#000',
        },
    },
});

w.app();

w.app().initialize();
w.app().auth();
w.app().template();
w.app().styled();

