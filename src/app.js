import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

(function () {
  var holder = document.getElementById('drag-file');

  holder.ondragover = () => {
      return false;
  };

  holder.ondragleave = () => {
      return false;
  };

  holder.ondragend = () => {
      return false;
  };

  holder.ondrop = (e) => {
        e.preventDefault();
        var SubDb = require("subdb");
        var path = require('path');
        const f = e.dataTransfer.files[0];
        document.body.style.cursor='progress';
        var extensao= path.extname(f.name);
        var name= f.name.replace(extensao,'');
        var dir= path.dirname(f.path);
        var subdb = new SubDb();
        subdb.computeHash(f.path, function(err, res) {
            if(err) {
              alert(err);
              return false;
            }

            var hash = res;
            subdb.api.search_subtitles(hash, function(err, res){

                if(err){
                  alert(err);
                  document.body.style.cursor='pointer';
                  return false;
                }

                var subFile= path.join(`${dir}`,`${name}.srt`);

               subdb.api.download_subtitle(hash, res.join(','),subFile , function(err, res) {
                  if(err){
                    alert(err);
                    document.body.style.cursor='pointer';
                    return false;
                  }

                    alert('Subtitle file saved with success !!');
                    document.body.style.cursor='pointer';
                });

            });
        });



  };
})();
