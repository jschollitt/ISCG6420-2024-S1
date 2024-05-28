const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let people = [];

const P = new Pokedex.Pokedex();
const pokeOptions = {
    protocol: "http",
    hostname: "127.0.0.1:5500",
    versionPath: "/api/v2",
    cache: true,
    timeout: 60 * 1000,
    cacheImages: true
}

$('document').ready(function () {
    // Example 1 setup
    $('#ex1randomPerson').click(function (e) {
        getRandomPersonData();
    });

    $('#ex1addPerson').click(function (e) {
        addPerson(...getFormFields());
    });

    $('#ex1clearData').click(function (e) {
        clearPeople();
    });

    // Example 2 setup
    $('#ex2button').click(function (e) {
        getGeo();
    });

    // Example 3 setup
    $('#ex3button').click(function (e) {
        getPokemon();
    });

});

function getFormFields() {
    console.log("Get form fields");
    return [
        $('#fname').val(),
        $('#lname').val(),
        $('#email').val()
    ];
}

function setFormFields(fname, lname, email) {
    console.log("set form fields");
    $('#fname').val(fname);
    $('#lname').val(lname);
    $('#email').val(email);
}

function getRandomPersonData() {
    console.log("get random person...");
    setLoading('#ex1loader', true);
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let person = data.results[0];
            setFormFields(person.name.first, person.name.last, person.email);
            setLoading('#ex1loader', false);
        },
        error: function (e) {
            setLoading('#ex1loader', false);
            console.error(e);
            alert(e.statusText);
        }
    });
}

function addPerson(first, last, email) {
    console.log("add person");
    people.push({
        firstname: first,
        lastname: last,
        email: email,
    });
    showPeopleJSON();
    setFormFields("", "", "");
}

function showPeopleJSON() {
    console.log("show json");
    let jsonString = JSON.stringify(people, null, 4);
    console.log(jsonString);
    $('#ex1json').val(jsonString);
}

function clearPeople() {
    people = [];
    $('#ex1json').val("");
}

function setLoading(element, show) {
    $(element).css("visibility", show ? "visible" : "hidden");
}

function getGeo() {
    if (!navigator.geolocation) {
        alert("Geolocation services not available");
        return;
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLoading('#ex2loader', true);
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d6f03de5d2301effb7d67aafdd141115`,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                setWeather(data);
                setLoading('#ex2loader', false);
            },
            error: function (e) {
                console.error(e);
                setLoading('#ex2loader', false);
                alert(e.statusText);
            }
        });
    });
}

function setWeather(data) {
    $('.weather-icon').css('background-image', `url("https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png")`);
    $('.weather-description').text(data.weather[0].description);
    $('.weather-temp').text(`${Math.round(data.main.temp)}`);
    $('.weather-temp-range').text(`${Math.round(data.main.temp_max)}°  /  ${Math.round(data.main.temp_min)}°`);
    $('.weather-location').text(data.name);
    let date = new Date();
    $('.weather-time').text(`${date.getHours()}:${date.getMinutes()}`);
    $('.weather-date').text(`${days[date.getDay()]} ${date.getDate()}-${date.getMonth()}`);
}

function getPokemon() {
    const interval = {
        offset: random(0, 646),
        limit: 3
    };
    P.getPokemonsList(interval).then(function (response) {
        response.results.forEach((pokemon) => {
            addPokemon(pokemon);
        });
    })
}

function addPokemon(pokemon) {
    console.log(pokemon);
    let name = pokemon.name;
    let url = pokemon.url.split('/');
    let id = url[url.length - 2];
    console.log(id);
    $('#ex3content')
        .prepend($('<div class="row"></div>')
            .append($('<div class="poke-panel"></div>')
                .append($('<div class="poke-loader"></div>')
                    .append($('<span class="loader"></span>')
                    )
                ).append($('<img class="poke-icon"></img>')
                    .attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`)
                        .on('load', function () {
                            console.log($(this));
                            $(this).siblings('.poke-loader').css("visibility", "hidden");
                        })
                ).append($('<div class="poke-name"></div>')
                    .text(name)
                )
            )
        );
}

function random(min, max) {
    return Math.random() * (Math.abs(min) + max) + min;
}