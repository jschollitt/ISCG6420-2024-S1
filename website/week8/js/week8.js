$('document').ready(function () {
    // exercise 1: jQuery Selectors
    $('#ex1DivButton').click(function () {
        let colour = getRandomColour();
        $('#demo1 div').css("background-color", colour);
    });

    $('#ex1ClassButton').click(function () {
        let colour = getRandomColour();
        $('.ex1DemoClass').css("background-color", colour);
    });

    $('#ex1IDButton').click(function () {
        let colour = getRandomColour();
        $('#ex1DemoID').css("background-color", colour);
    });


    // exercise 2: Selector filtering
    $('input:radio[name=radio-group]').change(function () {
        $('#ex2Output').html($('input:radio[name="radio-group"]:checked').val());
    });


    // exercise 3: Click events
    $('.ex3Click').click(function () {
        $(this).css("background-color", getRandomColour());
    });


    // exercise 4: Hover events
    let overlay = $("#ex4overlay");
    overlay.hide();

    $(".hover").hover(function () {
        overlay.css($(this).offset());
        overlay.html($(this).css("background-color").toString()).show();
    }, function () {
        overlay.hide();
    });


    // exercise 5: Focus events
    // Week 9

    // exercise 6: Show and Hide effects
    // Week 9

    // exercise 7: Fade effects
    // Week 9


    // exercise 8: Slide
    $('#ex8').click(function () {
        $('#lightbox').slideToggle(500);
    });
    

    // exercise 9: Animations
    let ex9Animated = false;
    $('#ex9 button').click(function () {
        let x = ex9Animated ? '0px' : '700px';

        $('#ex91').animate({left: x}, "fast");
        $('#ex92').animate({left: x}, "slow");
        $('#ex93').animate({left: x}, 1000);
        
        ex9Animated = !ex9Animated;
    });


    // exercise 10: Animation chaining
    $('#ex10 button').click(function () {
        $('#ex10animate').animate({ height: '500px', opacity: '0.5' }, "slow")
            .animate({ height: '500px', width: '500px', opacity: '1' }, "slow")
            .animate({ height: '100px', opacity: '0.5' }, "slow")
            .animate({ width: '100px', opacity: '1' }, "slow");
    });

    
    // exercise 11: Element creation
    $('#ex11 button').click(function () {
        ex13Submit();
    })

    $('#ex11 input:text').on('keypress', function(e) {
        if (e.keyCode === 13) {
            ex13Submit();
            $(this).val(function(i, val) {
                return '';
            });
        }
    })
});

function ex13Submit() {
    $('#ex11 table').append(                // append table row
        $('<tr>').append(                   // append table data
            $('<td>').html(                 // set the text of td
                $('#ex11 input:text').val() // fetch input value from user
            )
        )
    );
}

function getRandomColour() {
    switch (Math.floor(Math.random() * 10)) {
        case 0:
            return 'red';
        case 1:
            return 'orange';
        case 2:
            return 'yellow';
        case 3:
            return 'LightGreen';
        case 4:
            return 'Green';
        case 5:
            return 'LightBlue';
        case 7:
            return 'Blue';
        case 8:
            return 'indigo';
        case 9:
            return 'violet';
        default:
            return 'black';

    }
}


