"use strict";

        const questions = [
            { expr: '333 + 555 / 1000', answer: 333 + 555 / 1000 },
            { expr: '(333 + 555) / 1000', answer: (333 + 555) / 1000 },
            { expr: '0.333 + 0.555', answer: 0.333 + 0.555 },
            { expr: '8 / 2 * (2 + 2)', answer: 8 / 2 * (2 + 2) },
            { expr: '8 / 2 * 2 + 2', answer: 8 / 2 * 2 + 2 },
            { expr: '2 ** 3', answer: 2 ** 3 },
            { expr: '"a" < "b"', answer: "a" < "b" },
            { expr: '"cat" > "dog"', answer: "cat" > "dog" },
            { expr: '"2" < 10', answer: "2" < 10 },
            { expr: '"2" <  "10"', answer: "2" < "10" },
            { expr: '"4" / 2', answer: "4" / 2 },
            { expr: '3 / "6"', answer: 3 / "6" },
            { expr: '44 / 88', answer: 44 / 88 },
            { expr: '"2" + "4"', answer: "2" + "4" },
            { expr: '"2" * "4"', answer: "2" * "4" },
            { expr: '"10 " / false', answer: "10 " / false },
            { expr: 'true + false', answer: true + false },
            { expr: 'true + 1', answer: true + 1 },
            { expr: 'false - 3', answer: false - 3 },
            { expr: 'true / false', answer: true / false },
            { expr: 'false / true', answer: false / true },
            { expr: '5 - true', answer: 5 - true },
            { expr: '"5" - true', answer: "5" - true },
            { expr: '"flop" * 2', answer: "flop" * 2 },
            { expr: '"2" * 5', answer: "2" * 5 },
            { expr: '"flip" + false', answer: "flip" + false },
            { expr: 'false / "flop"', answer: false / "flop" },
            { expr: '"flipflop" + NaN', answer: "flipflop" + NaN },
            { expr: '2 + null', answer: 2 + null },
            { expr: '1 + "flip"', answer: 1 + "flip" },
            { expr: '55 + "flop" + 33', answer: 55 + "flop" + 33 },
            { expr: '55 + 33 + "flipflop"', answer: 55 + 33 + "flipflop" },
            { expr: '"flip" / "flop"', answer: "flip" / "flop" },
            { expr: '"flipflop" - "flop"', answer: "flipflop" - "flop" },
            { expr: 'true && False', answer: true && False }, // Fixed: False -> false
            { expr: 'true && true', answer: true && true },
            { expr: 'true || false', answer: true || false },
            { expr: 'true || false && false', answer: true || false && false },
            { expr: 'true && false && true', answer: true && false && true },
            { expr: '!false', answer: !false },
            { expr: '!undefined', answer: !undefined }
        ];

        let current = 0;

        function showQuestion() {
            const q = questions[current];
            document.getElementById('question-number').textContent = `Spørgsmål ${current + 1} af ${questions.length}`;
            document.getElementById('expression').textContent = `Udtryk: ${q.expr}`;
            try {
                document.getElementById('answer').textContent = `Svar: ${q.answer}`;
            } catch (e) {
                document.getElementById('answer').textContent = `Svar: Error - ${e.message}`;
            }
        }

        function myFunction() {
            current = (current + 1) % questions.length;
            showQuestion();
        }
        function prevFunction() {
            current = (current - 1 + questions.length) % questions.length;
            showQuestion();
        }

        // Initialize the first question when page loads
        window.addEventListener('load', showQuestion);

        // Also add event listener as backup
        document.getElementById('nxt').addEventListener('click', myFunction);
        document.getElementById('prev').addEventListener('click', prevFunction);


// program that accepts a letter and make a name with it





