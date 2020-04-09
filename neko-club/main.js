var chara = document.querySelector('#chara');
var inner = document.querySelector('#chara-inner');
var loop = document.querySelectorAll('.loop');
var fade = document.querySelector('.chara-box');
var menu = document.querySelector('.chara-menu');
var info = document.querySelector('.chara-info p');
var title = document.querySelector('.chara-name h1');
var male = document.querySelector('.male');
var message = document.querySelector('#message');
var logo = document.querySelector('#logo');

var resetBtn = document.querySelector('.reset');

var main = document.querySelector('.main');
var face1 = document.querySelector('#face01');
var face2 = document.querySelector('#face02');
var face3 = document.querySelector('#face03');

var header = document.querySelector('header');
var content = document.querySelector('main');

var time = setInterval(auto, 3000);
var current = 0;

var guy;
var gal;

var mq = window.matchMedia('(max-width: 960px)');

const observer = lozad();
observer.observe();

const coolImage = document.querySelector('.image-to-load-first')
// ... trigger the load of a image before it appears on the viewport
observer.triggerLoad(coolImage);

// Skips the first fade animation after page loads
// Note: If the CSS animation plays at x seconds, the timeout should be set longer than x seconds. I would add at least 0.5 more seconds just to be safe
// Note: This function will disable if the content inside the timeout function was added on any event handler
function init() {
  setTimeout(function() {
    document.body.classList.remove('preload');
  }, 2000);
}

// Disables the message screen when you click
document.body.addEventListener('click', body);
function body() {
  update();
  initEnd();
  resetTime();

  content.style.opacity = '1';
  content.style.animation = 'none';
  logo.style.opacity = '1';
  logo.style.animation = 'none';

  document.body.removeEventListener('click', body);
  message.removeEventListener('animationstart', initStart);
  message.removeEventListener('animationend', initEnd);
}

// Disables the 'draggable' functionally while the message screen starts
message.addEventListener('animationstart', initStart);
function initStart() {
  menu.removeEventListener('click', charaMenu);
  $('.drag').draggable('disable');
  clearInterval(time);

  setTimeout(function() {
    resetTime();
  }, 4000);
}

// Enables the 'draggable' functionally while the message screen ends
message.addEventListener('animationend', initEnd);
function initEnd() {
  menu.addEventListener('click', charaMenu);
  message.style.display = 'none';
  $('.drag').draggable('enable');
}

// When the 'reset button' is clicked
// It resets character to default position, face expression, and time inverval
resetBtn.addEventListener('click', reset);
function reset() {
  resetPosition();
  resetFace();
  resetTime();
}

// Reset character to default position
function resetPosition() {
  chara.style.left = '0';
  chara.style.top = '-80px';
}

// Reset character to default face expression
function resetFace() {
  i = -1;
  current = i;
  auto();
}

// Automatic loop functionality
function auto() {
  current = (current + 1) % loop.length;
  update();
}

function update() {
  for (var i = 0; i < loop.length; i++) {
    if (i === current) {
      loop[i].style.opacity = '1';
    } else {
      loop[i].style.opacity = '0';
    }
  }
}

// Reset/Restart Time Interval
function resetTime() {
  clearInterval(time);
  time = setInterval(auto, 3000);
}

// Fade in character slide animation
function start() {
  $('#chara-inner').fadeIn();
  inner.style.animation = 'start 0.5s 1 forwards';
  info.style.animation = 'fade-in 0.5s 1 forwards';
  title.style.animation = 'fade-in 0.5s 1 forwards';
  resetBtn.style.animation = 'fade-in 0.5s 1 forwards';
  chara.style.zIndex = 'auto';
}

// Fade out character slide animation
function end() {
  clearInterval(time);
  $('#chara-inner').fadeOut();
  inner.style.animation = 'end 0.5s 1 forwards';
  info.style.animation = 'fade-out 0.5s 1 forwards';
  title.style.animation = 'fade-out 0.5s 1 forwards';
  resetBtn.style.animation = 'fade-out 0.5s 1 forwards';
}

// Pauses the character face animation when hovered
chara.addEventListener('mouseenter', function(e) {
  clearInterval(time);
});

// Unpauses the character face animation when not hovered
chara.addEventListener('mouseleave', function(e) {
  resetTime();
});

// Increases the z-index to 5 when holding down the mouse
chara.addEventListener('mousedown', function(e) {
  chara.style.zIndex = '5';
});

// Sets the z-index to default when you not holding down the mouse
chara.addEventListener('mouseup', function(e) {
  chara.style.zIndex = 'auto';
});

// Disables 'draggable' UI while the character image is sliding
inner.addEventListener('animationstart', disable);
function disable() {
  $('.drag').draggable('disable');
}

// Enables 'draggable' UI while the character image is not sliding
inner.addEventListener('animationend', enable);
function enable() {
  $('.drag').draggable('enable');
}

// Disables 'click' event while the character image starts sliding
fade.addEventListener('animationstart', function() {
  menu.removeEventListener('click', charaMenu);
});

// Enables 'click' event while the character image finishes sliding
fade.addEventListener('animationend', function(e) {
  if (e.target.className === 'male') {
    clearTimeout(gal);
  } else {
    clearTimeout(guy);
  }

  menu.addEventListener('click', charaMenu);
});

// Event Delegation for Chara Menu
menu.addEventListener('click', charaMenu);
function charaMenu(e) {
  // If target is not a button (in this case does not contain an id attribute)
  // Do nothing
  if (!e.target.id) {
    return;
  }

  // Or if target is a male character (in this case contain a class name of "male")
  // Switch character
  // Disable 'draggable' functionally
  else if (e.target.className === 'male') {
    inner.removeEventListener('animationend', enable);
    end();
    if (e.target.className === 'male') {
      clearTimeout(gal);
    } else {
      clearTimeout(guy);
    }
    var guy = setTimeout(male, 500);
    function male() {
      reset();
      start();

      if (mq.matches) {
        resetBtn.style.display = 'none';
      } else {
        resetBtn.style.display = 'none';
      }

      switch (e.target.id) {
        // Male Characters
        case 'akihiro-btn':
          title.textContent = 'Akihiro Sokuru';
          fade.style.background = 'var(--akihiro)';
          fade.style.background =
            'linear-gradient(180deg, #D03637 60%, #D5DDEA)';

          main.src = 'images/chara/akihiro_default.png';
          face1.src = 'images/chara/akihiro_expression1.png';
          face2.src = 'images/chara/akihiro_expression2.png';
          face3.src = 'images/chara/akihiro_expression3.png';

          info.textContent =
            "Living in the slums as a child with his only friend 'Maki', Akihiro Sokuru pulled himself from his bootstraps and aggressively climbed his way to the top of the business world involving a series of suspicious scandals and forced resignations of his competitors. Intelligent, charismatic, and highly competitive, Akihrio continues to strive to higher power, even competing against his childhood friend for higher office. With his contrasting views on Nekos, Akihiro poses a great threat to Nagamichi's goals.";
          break;

        case 'kowayama-btn':
          title.textContent = 'Totake Kowayama';
          fade.style.background = 'var(--kowayama)';
          fade.style.background =
            'linear-gradient(180deg, #766A91 60%, #832826)';

          main.src = 'images/chara/kowayama_default.png';
          face1.src = '';
          face2.src = '';
          face3.src = '';

          info.textContent =
            'As a federal agent, Totake Kowayama has solved more neko based crime than anyone in the short history of Neko Unit. His unnatural drive for justice is only matched by his surprising knowledge of nekos themselves, solving many cases based on facts that not even nekos knows about themselves. Stoic, calm, but terrifyingly relentless, his demeanor quickly changes whenever the white neko is involved. What could it be? No one really knows...well...almost no one.';
          break;

        case 'masaru-btn':
          title.textContent = 'Masaru Sokuru';
          fade.style.background = 'var(--masaru)';
          fade.style.background =
            'linear-gradient(180deg, #FDF6E5 60%, #514B3F)';

          main.src = 'images/chara/masaru_default.png';
          face1.src = 'images/chara/masaru_expression1.png';
          face2.src = 'images/chara/masaru_expression2.png';
          face3.src = 'images/chara/masaru_expression3.png';

          info.textContent =
            "Former childhood best friend of Yutei, the two now butt heads constantly. Masaru's grudge against Yutei comes from a specific event years ago involving Asako in some ways. On the surface, Masaru can seem like a jerk, but deep down, he is also a jerk. But underneath even that, he is softhearted with interests that he is ashamed to admit due to their unmanly traits as his father puts it, and even worse, he holds resentments towards himself for a secret not even Yutei knows.";
          break;

        case 'nagamichi-btn':
          title.textContent = 'Masahiro Nagamichi';
          fade.style.background = 'var(--nagamichi)';
          fade.style.background =
            'linear-gradient(180deg, #E2CDBA 60%, #383A44)';

          main.src = 'images/chara/nagamichi_default.png';
          face1.src = 'images/chara/nagamichi_expression1.png';
          face2.src = 'images/chara/nagamichi_expression2.png';
          face3.src = 'images/chara/nagamichi_expression3.png';

          info.textContent =
            'A self made man, Masahiro Nagamichi risen to his headmaster role from a humble background orphaned on the streets. Thanks to the first encouragement he ever got from a teacher, he abandoned his delinquent and violent ways and dedicated himself to the kind and compassionate leader he is today. His only dream besides his desire to reform education and society is for his beloved stepson to find happiness....and stop telling bad jokes...';
          break;

        case 'sato-btn':
          title.textContent = 'Sato';
          fade.style.background = 'var(--sato)';
          fade.style.background =
            'linear-gradient(180deg, #CF8E8A 60%, #494149)';

          main.src = 'images/chara/sato_default.png';
          face1.src = '';
          face2.src = '';
          face3.src = '';

          info.textContent =
            'Being the youngest graduate to join the Neko Unit task force, Sato has a lot of expectations set on him, including some jealousy from older peers. Though inexperienced, his idol and captain, Kowayama seems to put him in high regards by having him lead several missions on his own. It just hurts when his plans blunders more often than not, especially due to his social ineptitude and lack of tact...especially with women.';
          break;

        default:
          return;
      }
    }
  }

  // Otherwise, switch character
  // Keep/Enable 'draggable' functionally
  else {
    inner.addEventListener('animationend', enable);
    end();

    if (e.target.className === 'male') {
      clearTimeout(gal);
    } else {
      clearTimeout(guy);
    }

    var gal = setTimeout(female, 500);
    function female() {
      reset();
      start();

      if (mq.matches) {
        resetBtn.style.display = 'none';
      } else {
        resetBtn.style.display = 'inline-block';
      }

      switch (e.target.id) {
        // Main Heroines
        case 'seiko-btn':
          title.textContent = 'Seiko Nekomiya';
          fade.style.background = 'var(--seiko)';
          fade.style.background =
            'linear-gradient(180deg, #ffb9b5 60%, #4e86fd)';

          main.src = 'images/chara/seiko_default.png';
          face1.src = 'images/chara/seiko_expression1.png';
          face2.src = 'images/chara/seiko_expression2.png';
          face3.src = 'images/chara/seiko_expression3.png';

          info.textContent =
            "Seiko is a sweet and hardworking girl. Everything about her is a picture of perfection until you see her grades. Polite and understanding, she serves as Sayaka's closest friend, and mediator between her and Yutei. Though she is earnest and understanding, she doesn't express much of her feelings and concerns.";
          break;

        case 'sayaka-btn':
          title.textContent = 'Sayaka Nyakumi';
          fade.style.background = 'var(--sayaka)';
          fade.style.background =
            'linear-gradient(180deg, #f4deb5 60%, #832826)';

          main.src = 'images/chara/sayaka_default.png';
          face1.src = 'images/chara/sayaka_expression1.png';
          face2.src = 'images/chara/sayaka_expression2.png';
          face3.src = 'images/chara/sayaka_expression3.png';

          info.textContent =
            "Blessed with both beauty and brains, Sayaka seems to be the poster child of perfection if it wasn't for her hostile personality towards others, especially Yutei. Sayaka's guarded heart is due to her own upbringing and family secrets, which she only shares with her closest friend Seiko. Sayaka is a bottle of contradiction, rejecting even her own feelings, and denying her interests in Yutei, while still remaining annoyingly close by to him with the help of her trusted mediator. Though studious and hardworking, she has a lot to learn about her own heart.";
          break;

        case 'asako-btn':
          title.textContent = 'Asako Sakashi';
          fade.style.background = 'var(--asako)';
          fade.style.background =
            'linear-gradient(180deg, #E2CDBA 60%, #832826)';

          main.src = 'images/chara/asako_default.png';
          face1.src = 'images/chara/asako_expression1.png';
          face2.src = 'images/chara/asako_expression2.png';
          face3.src = 'images/chara/asako_expression3.png';

          info.textContent =
            'Saved by Yutei 10 years ago, she shares his home and acts as his supportive caregiver and closest confidant while chastising him frequently for her own entertainment. Asako speaks her mind and pulls no punches both literally and figuratively. Her compassionate and caring personality is only rivaled by her temper. She cares deeply for Yutei and is constantly worried about his lack of social skills or drive, encouraging him in some way or another to try and be more proactive. Though she appears tough and independent, she has deep fear rooted in past trauma.';
          break;

        case 'miyame-btn':
          title.textContent = 'Miyame Shukufu';
          fade.style.background = 'var(--miyame)';
          fade.style.background =
            'linear-gradient(180deg, #FFE5F7 60%, #832826)';

          main.src = 'images/chara/miyame_default.png';
          face1.src = 'images/chara/miyame_expression1.png';
          face2.src = 'images/chara/miyame_expression2.png';
          face3.src = 'images/chara/miyame_expression3.png';

          info.textContent =
            "She appears in Yutei's life suddenly and now lives with him and his family as if by chance. Miyame is energetic, untamed and innocent. She is as cute as she is uncontrollable, and an enigma to Asako who can't seem to shake off something off about her scent. Her childlike love for Yutei makes her a cute little sister that Yutei never expected.";
          break;

        // Minor Characters
        case 'kat-btn':
          title.textContent = 'Kat';
          fade.style.background = 'var(--kat)';
          fade.style.background =
            'linear-gradient(180deg, #A59BBB 60%, #232323)';

          main.src = 'images/chara/kat_default.png';
          face1.src = 'images/chara/kat_expression1.png';
          face2.src = 'images/chara/kat_expression2.png';
          face3.src = 'images/chara/kat_expression3.png';

          info.textContent =
            "Kowayama's unofficial partner that he brings with wherever he goes. Abused and scarred, Kat suffered immense physical and emotional pain until she was saved by Kowayama. Both share a mutual trusts in one another, and despite protests, Kat is allowed to assists her savior in solving cases. She is sweet, soft spoken, and well mannered.";
          break;

        case 'sabrina-btn':
          title.textContent = 'Sabrina Nyakumi';
          fade.style.background = 'var(--sabrina)';
          fade.style.background =
            'linear-gradient(180deg, #f4deb5 60%, #4C4F70)';

          main.src = 'images/chara/sabrina_default.png';
          face1.src = 'images/chara/sabrina_expression1.png';
          face2.src = 'images/chara/sabrina_expression2.png';
          face3.src = 'images/chara/sabrina_expression3.png';

          info.textContent =
            "Estranged to her sister, Sabrina shows no interest in following Sayaka's self righteous footstep in education and integrity. Sabrina uses her looks and charm to get what she want from the men she swoons, whether its money, food, or information. Recently she's been absent from both school and home more often than usual and Sayaka is very worried. If not for her sister's sake, at least she is worried that people will connect Sabrina's being a Neko to her own identity.";
          break;

        case 'whiteneko-btn':
          title.textContent = 'White Neko';
          fade.style.background = 'var(--whiteneko)';
          fade.style.background =
            'linear-gradient(180deg, #608BAF 60%, #832826)';

          main.src = 'images/chara/whiteneko_default.png';
          face1.src = 'images/chara/whiteneko_expression1.png';
          face2.src = 'images/chara/whiteneko_expression2.png';
          face3.src = 'images/chara/whiteneko_expression3.png';

          info.textContent =
            'A mysterious Neko of unknown origins, she carries out vigilante justice by attacking those who have committed a crime against her race. With her mysterious and glowing bluish white hair, confused victims describes her as a ghost, thus spurring on  both the rumors of the revenge seeking ghost neko, as well as the neko goddess, depending on who you ask. Little is known about her, and police shows little interests, so why is it that Neko Unit seems so intent on looking into these rumors?';
          break;

        case 'rei-btn':
          title.textContent = 'Rei';
          fade.style.background = 'var(--rei)';
          fade.style.background =
            'linear-gradient(180deg, #608BAF 60%, #832826)';

          main.src = 'images/chara/rei_default.png';
          face1.src = 'images/chara/rei_expression1.png';
          face2.src = 'images/chara/rei_expression2.png';
          face3.src = 'images/chara/rei_expression3.png';

          info.textContent =
            "Little is known about her, and even less is known about her other transformation. The white neko's mother holds a cynical and untrustworthy views of humans unlike her daughter who is aggressively pushing for societal reforms. Her dispassionate disposition is mostly due to her past, specifically her mysterious relationship with Kowayama.";
          break;

        // Backer Exclusives
        case 'allie-btn':
          title.textContent = 'Allie Gato';
          fade.style.background = 'var(--allie)';
          fade.style.background =
            'linear-gradient(180deg, #7366BA 60%, #EEA8DC)';

          main.src = 'images/chara/allie_default.png';
          face1.src = 'images/chara/allie_expression1.png';
          face2.src = 'images/chara/allie_expression2.png';
          face3.src = 'images/chara/allie_expression3.png';

          info.textContent =
            'An enigmatic and quirky character bordering somewhere between insanely dispassionate, to passionately insane with her quips and logic. Allie is a great source of entertainment and pop culture references. Her passion for food is only match by her passion to insult Yutei whenever possible.';
          break;

        case 'bubastis-btn':
          title.textContent = 'Bubastis';
          fade.style.background = 'var(--bubastis)';
          fade.style.background =
            'linear-gradient(180deg, #EFC6A2 60%, #B47560)';

          main.src = 'images/chara/bubastis_default.png';
          face1.src = 'images/chara/bubastis_expression1.png';
          face2.src = 'images/chara/bubastis_expression2.png';
          face3.src = 'images/chara/bubastis_expression3.png';

          info.textContent =
            'As a foreign exchange student Bubastis already stood out with her looks as it is. Her capricious nature and sudden impulse to dive straight into the depth of different interests and hobbies make her both endearing and unpredictable. Currently she is interested into the occults and the worship of the rumored Neko Goddess and has even glued cat ears on her head. Upbeat, positive and quirky, Bubastis makes up for her overbearing nature with her endearing personality and childlike innocence.';
          break;

        case 'mingita-btn':
          title.textContent = 'Mingita';
          fade.style.background = 'var(--mingita)';
          fade.style.background =
            'linear-gradient(180deg, #EF7468 60%, #832826)';

          main.src = 'images/chara/mingita_default.png';
          face1.src = 'images/chara/mingita_expression1.png';
          face2.src = 'images/chara/mingita_expression2.png';
          face3.src = 'images/chara/mingita_expression3.png';

          info.textContent =
            'A fun sarcastic character whose need for money causes her to show up in various places randomly due to her constant search for a new part-time job.';
          break;

        default:
          return;
      }
    }
  }
}

init();
update();
