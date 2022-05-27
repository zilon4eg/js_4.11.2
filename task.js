const getPoll = new XMLHttpRequest();

// ожидаем ответа на запрос и действуем
getPoll.addEventListener('readystatechange', () => {
    if (getPoll.readyState === getPoll.DONE) {
        // преобразуем строку ответа в объект JSON
        const res = JSON.parse(getPoll.responseText);

        document.getElementById('poll__title').textContent = res.data.title;
        // создаем элементы btn
        for (i=0; i<res.data.answers.length; i++) {
            const newBtn = document.createElement('button');
            newBtn.className = 'poll__answer';
            newBtn.textContent = res.data.answers[i];
            document.getElementById('poll__answers').appendChild(newBtn);
        }

        const btns = document.getElementsByClassName('poll__answer');
        for (i=0; i<btns.length; i++) {
            btns[i].addEventListener('click', (e) => {
                // отключаем поведение кнопки на всякий случай
                e.preventDefault();

                // ожидаем ответа на запрос и действуем
                const postPoll = new XMLHttpRequest();
                postPoll.addEventListener('readystatechange', () => {
                    if (postPoll.readyState === postPoll.DONE) {
                        // преобразуем строку ответа в объект JSON
                        const postRes = JSON.parse(postPoll.responseText);                        
                        // создаем элементы div и меняем btn на них
                        const answers = document.getElementsByClassName('poll__answer');
                        for (i=0; i<postRes.stat.length; i++) {
                            const statEl = document.createElement('div');
                            statEl.className = 'poll__answer';
                            statEl.textContent = `${postRes.stat[i].answer}: ${postRes.stat[i].votes}`;
                            answers[i].replaceWith(statEl);
                        } 
                    }
                });

                // отправляем POST запрос
                postPoll.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
                postPoll.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                postPoll.send(`vote=${res.id}&answer=${i}`);
                alert('Спасибо, ваш голос засчитан!');
            });
        }
    }
});

// отправляем GET запрос
getPoll.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
getPoll.send();