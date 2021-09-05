function gistIframe(src) {
    return '<iframe src="' + src + '" frameBorder="0" style="height:750px;width:100%;border:1px solid #ddd"></iframe>';
}

let LANGS = {
    'csharp': { name:"C#" },
    'typescript': { name:"TypeScript" },
    'python': { name:"Python" },
    'dart': { name:"Dart" },
    'java': { name:"Java" },
    'kotlin': { name:"Kotlin" },
    'swift': { name:"Swift" },
    'vbnet': { name:"VB.NET" },
    'fsharp': { name:"F#" },
}

let $serviceRef = $1('#serviceRef');
if ($serviceRef) {
    let SVG_FOLDER = '<svg class="w-12 h-12 inline-block mb-2" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">' +
        '  <path fill="currentColor" d="M9.49094 4.40235C9.1153 4.14129 8.66749 4 8.20693 4H4.25L4.09595 4.00519C2.92516 4.08436 2 5.05914 2 6.25V17.75L2.00519 17.904C2.08436 19.0748 3.05914 20 4.25 20H19.75L19.904 19.9948C21.0748 19.9156 22 18.9409 22 17.75V8.75L21.9948 8.59595L21.9785 8.43788C21.8266 7.34297 20.8867 6.5 19.75 6.5H12.022L9.64734 4.5215L9.49094 4.40235ZM13.4967 8V10.2451C13.4967 10.6593 13.8325 10.9951 14.2467 10.9951H14.9967V11.9976H14.7467C14.3325 11.9976 13.9967 12.3334 13.9967 12.7476C13.9967 13.1618 14.3325 13.4976 14.7467 13.4976H14.9967V14.9976H14.7467C14.3325 14.9976 13.9967 15.3334 13.9967 15.7476C13.9967 16.1618 14.3325 16.4976 14.7467 16.4976H14.9967V18.5H4.25L4.14823 18.4932C3.78215 18.4435 3.5 18.1297 3.5 17.75V10.499L8.20693 10.5L8.40335 10.4914C8.85906 10.4515 9.29353 10.2733 9.64734 9.9785L12.021 8H13.4967ZM16.4967 18.0004H16.7467C17.1609 18.0004 17.4967 17.6646 17.4967 17.2504C17.4967 16.8362 17.1609 16.5004 16.7467 16.5004H16.4967V15.0004H16.7467C17.1609 15.0004 17.4967 14.6646 17.4967 14.2504C17.4967 13.8362 17.1609 13.5004 16.7467 13.5004H16.4967V10.9951H17.2467C17.6609 10.9951 17.9967 10.6593 17.9967 10.2451V8H19.75L19.8518 8.00685C20.2178 8.05651 20.5 8.3703 20.5 8.75V17.75L20.4932 17.8518C20.4435 18.2178 20.1297 18.5 19.75 18.5H16.4967V18.0004ZM16.4967 8V9.49513L14.9967 9.49513V8H16.4967ZM4.25 5.5H8.20693L8.31129 5.5073C8.44893 5.52664 8.57923 5.58398 8.68706 5.67383L10.578 7.249L8.68706 8.82617L8.60221 8.88738C8.4841 8.96063 8.34729 9 8.20693 9L3.5 8.999V6.25L3.50685 6.14823C3.55651 5.78215 3.8703 5.5 4.25 5.5Z"></path>' +
        '</svg>';

    let SERVICE_REF_EXAMPLES = {
        "basic": {
            label:"Basic Example",
            src: "https://gist.cafe/embed?gist=https%3A%2F%2Fapps.servicestack.net%2Fgists%2Fcovid-vac-watch.netcore.io%2Fcsharp%2FGetLocations()",
            zip: "https://gist.cafe/archive?url=https%3A%2F%2Fapps.servicestack.net%2Fgists%2Fcovid-vac-watch.netcore.io%2Fcsharp%2FGetLocations()&name=MyApp",
            jupyter: "https://apps.servicestack.net/json/reply/CreateNotebook?Lang=csharp&Slug=covid-vac-watch.netcore.io&IncludeTypes=&Request=GetLocations&Args=&Name=",
        },
        "autoquery": {
            label: "AutoQuery Example",
            src: "https://gist.cafe/embed?gist=https%3A%2F%2Fapps.servicestack.net%2Fgists%2Ftechstacks.io%2Fcsharp%2FFindTechnologies(Ids%3A%5B1%2C2%2C4%2C6%5D%2CVendorName%3AGoogle%2CTake%3A10%2CFields%3A%22Id%2C%20Name%2C%20Slug%2C%20Tier%2C%20FavCount%2C%20ViewCount%22)",
            zip: "https://gist.cafe/archive?url=https%3A%2F%2Fapps.servicestack.net%2Fgists%2Ftechstacks.io%2Fcsharp%2FFindTechnologies(Ids%3A%5B1%2C2%2C4%2C6%5D%2CVendorName%3AGoogle%2CTake%3A10%2CFields%3A%22Id%2C%20Name%2C%20Slug%2C%20Tier%2C%20FavCount%2C%20ViewCount%22)&name=MyApp",
            jupyter: "https://apps.servicestack.net/json/reply/CreateNotebook?Lang=csharp&Slug=techstacks.io&IncludeTypes=&Request=FindTechnologies&Args=%7BIds%3A%5B1%2C2%2C4%2C6%5D%2CVendorName%3A%27Google%27%2CTake%3A10%2CFields%3A%27Id%2C%20Name%2C%20Slug%2C%20Tier%2C%20FavCount%2C%20ViewCount%27%7D&Name=",
        },
    }
    let $selServiceRefExamples = $1('.sel-examples'), $download = $1('.download');
    function updatePreview(lang) {
        let selectedExample = SERVICE_REF_EXAMPLES[$selServiceRefExamples.value];
        let iframeSrc = selectedExample.src.replace('csharp',lang);
        $1('.lang-preview').innerHTML = gistIframe(iframeSrc);

        let notebookHtml = '<a id="notebook" href="' + selectedExample.jupyter.replace('csharp',lang) + '" style="display: block;">\n' +
            '    <img class="w-12 h-12 inline-block mb-2 ml-8" src="/images/svgs/jupyter.svg" alt="Jupyter Notebook Logo">\n' +
            '    <span class="mx-1 text-2xl inline-block">' + LANGS[lang].name + ' Notebook</span>\n' +
            '  </a>\n';
        let downloadHtml = '<div class="flex justify-center">\n' +
            '  <a id="zip" href="' + selectedExample.zip.replace('csharp',lang) + '">\n' +
            SVG_FOLDER +
            '    <span class="ml-1 text-2xl inline-block">Download.zip</span>\n' +
            '  </a>\n' +
            (['csharp','python','fsharp'].indexOf(lang) >= 0 ? notebookHtml : '') +
            '</div>';
        $download.innerHTML = downloadHtml;
    }

    on('[data-lang]', {
        click: function (e) {
            if (this.classList.contains('active')) return;
            $1('[data-lang].active').classList.remove('active');
            this.classList.add('active');
            updatePreview(this.getAttribute('data-lang'));
        }
    })
    on($selServiceRefExamples, {
        change: function (e) {
            console.log('$selServiceRefExamples.change', e, this)
            updatePreview($1('[data-lang].active').getAttribute('data-lang'));
        }
    })

    let html = Object.keys(SERVICE_REF_EXAMPLES).map(function(k) {
        let o = SERVICE_REF_EXAMPLES[k];
        return '<option value="' + k + '">' + o.label + '</option>';
    });
    $selServiceRefExamples.innerHTML = html.join('');

    let firstLang = $$('[data-lang]')[0];
    firstLang.classList.add('active');
    updatePreview(firstLang.getAttribute('data-lang'));
}


