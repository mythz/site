function isAlphaNumeric(c) {
    return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || c === 95; //A-Za-z0-9_
}
function leftPart(s, needle) {
    if (s == null)
        return null;
    let pos = s.indexOf(needle);
    return pos == -1
        ? s
        : s.substring(0, pos);
}
function updateTemplates() {
    let name = $('#txtProjectName').val() || 'MyApp';
    let mix = getMix();
    let urlParams = 'Name=' + encodeURIComponent(name);
    if (mix) {
        urlParams += '&Mix=' + mix;
    }
    let defaultState = urlParams == 'Name=MyApp';
    if (defaultState) {
        history.replaceState(null,null,location.href.split('#')[0]);
        $('#reset').addClass('invisible');
    } else {
        history.replaceState(null,null,'#'+urlParams);
        $('#reset').removeClass('invisible');
    }

    $('.archive-url').each(function () {
        let url = leftPart(this.href, '?') + '?' + urlParams;
        this.href = url;
    });
    $('.archive-name').each(function () {
        this.innerHTML = name + '.zip';
    });
    $('.project-name').each(function () {
        this.innerHTML = name;
    });

    $('#tool .copy-cmd label').html('x new web ' + name + (mix ? ' && cd ' + name + ' && x mix -f ' + mix.replace(/,/g,' ') : ''));
}
function getMix() {
    let mix = [];
    $('#mix input:checked').each(function () {
        mix.push(this.value);
    });
    return mix.join(',');
}
$('[name=auth-repo]').on('input', function () { $('#chkAuth').prop('checked',true) });
$('[name=action]').on('input', function () { $('#chkActionBuild').prop('checked',true) });
$('#mix [type=checkbox],#mix [type=radio]').on('input', updateTemplates);

function reset() {
    $('#txtProjectName').val('');
    $('#mix input:checked').prop('checked',false);
    updateTemplates();
}

function splitOnFirst(s, c) {
    if (!s) return [s];
    let pos = s.indexOf(c);
    return pos >= 0 ? [s.substring(0, pos), s.substring(pos + 1)] : [s];
}
function hashParams(url) {
    if (!url || url.indexOf('#') === -1) return {};
    let pairs = splitOnFirst(url, '#')[1].split('&');
    let map = {};
    for (let i = 0; i < pairs.length; ++i) {
        let p = pairs[i].split('=');
        map[p[0]] = p.length > 1
            ? decodeURIComponent(p[1].replace(/\+/g, ' '))
            : null;
    }
    return map;
}

if (location.hash) {
    let hash = hashParams(location.hash);
    if (hash.Name && hash.Name != 'MyApp') {
        $('#txtProjectName').val(hash.Name);
    }
    if (hash.Mix) {
        let mix = hash.Mix.split(',');
        mix.forEach(function (id) {
            $(`input[value=${id}]`).prop('checked',true);
        });
    }
    updateTemplates();
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

fetch(DYNAMIC_URL + "/stats/projects.json")
    .then(function (r) { return r.json(); })
    .then(function (obj) {
        let results = obj.Results || obj.results;
        Object.keys(results).forEach(function (k) {
            let count = results[k];
            let name = k.indexOf('/') >= 0
                ? k.replace('/','_')
                : 'netcoretemplates_' + k;
            let $count = $1('.' + name + ' .count');
            if (!$count) return;
            $count.innerHTML = count < 60
                ? '<span class="px-2 h-8 rounded-lg bg-red-50 text-red-600 text-sm">new</span>'
                : formatNumber(count) + ' installs';
        });
    })
