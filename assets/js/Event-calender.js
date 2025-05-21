 (function () {
            const monthNames = [
                'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
                'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
            ];

            // example dot map: 'YYYY-MM-DD' → 'red'|'blue'
            const dateAttrs = {
                '2026-02-06': 'red',
                '2026-02-07': 'red',
                '2026-02-11': 'blue',
                '2026-02-16': 'blue'
            };

            // example tooltip map: 'YYYY-MM-DD' → [ {text, ok}, … ]
            const dateInfos = {
                '2026-02-22': [{
                        text: '10 צימרים זהים',
                        ok: true
                    },
                    {
                        text: 'צימר הפנינה',
                        ok: false
                    },
                    {
                        text: 'וילת הבקתה',
                        ok: true
                    },
                    {
                        text: 'צימר סיגל',
                        ok: false
                    }
                ]
            };

            let viewY = 2026,
                viewM = 2; // left panel = Feb 2026
            const z2 = n => String(n).padStart(2, '0');

            function renderAll() {
                // compute right panel = previous month
                let rY = viewY,
                    rM = viewM - 1;
                if (rM < 1) {
                    rM = 12;
                    rY--;
                }

                document.querySelectorAll('.calendar-month')
                    .forEach((el, i) => {
                        const Y = (i === 0 ? viewY : rY);
                        const M = (i === 0 ? viewM : rM);
                        renderMonth(el, Y, M);
                    });
            }

            function renderMonth(el, Y, M) {
                el.querySelector('h3').textContent = `${monthNames[M-1]} ${Y}`;

                const grid = el.querySelector('.days-grid');
                grid.innerHTML = '';

                // How many blank slots before day 1?
                // JS getDay(): 0=Sun…6=Sat; we want 0 blanks for Sun, 1 for Mon…6 for Sat
                const jsDow = new Date(Y, M - 1, 1).getDay();
                const blankCount = jsDow;
                const daysInMonth = new Date(Y, M, 0).getDate();

                // leading blanks
                for (let i = 0; i < blankCount; i++) {
                    const b = document.createElement('div');
                    b.className = 'day blank';
                    grid.appendChild(b);
                }

                // actual days
                for (let d = 1; d <= daysInMonth; d++) {
                    const iso = `${Y}-${z2(M)}-${z2(d)}`;
                    const day = document.createElement('div');
                    day.className = 'day';
                    day.dataset.date = iso;

                    // number bubble
                    const num = document.createElement('span');
                    num.className = 'date';
                    num.textContent = d;
                    day.appendChild(num);

                    // dot
                    if (dateAttrs[iso]) {
                        day.classList.add('has-data', dateAttrs[iso]);
                        const dot = document.createElement('span');
                        dot.className = `data-dot ${dateAttrs[iso]}`;
                        day.appendChild(dot);
                    }

                    // tooltip
                    if (dateInfos[iso]) {
                        const tip = document.createElement('div');
                        tip.className = 'tooltip';
                        const ul = document.createElement('ul');
                        dateInfos[iso].forEach(o => {
                            const li = document.createElement('li'),
                                ic = document.createElement('span'),
                                tx = document.createElement('span');
                            ic.className = 'icon ' + (o.ok ? 'ok' : 'no');
                            ic.textContent = o.ok ? '✓' : '✕';
                            tx.textContent = o.text;
                            li.append(ic, tx);
                            ul.appendChild(li);
                        });
                        tip.appendChild(ul);
                        day.appendChild(tip);
                    }

                    day.addEventListener('click', onDateClick);
                    grid.appendChild(day);
                }

                // trailing blanks to fill 6 rows (42 cells total)
                const total = blankCount + daysInMonth;
                for (let i = total; i < 42; i++) {
                    const b = document.createElement('div');
                    b.className = 'day blank';
                    grid.appendChild(b);
                }
            }

            // selection & range styling
            let selStart = null,
                selEnd = null;

            function onDateClick(e) {
                const iso = e.currentTarget.dataset.date;
                if (!selStart || selEnd) {
                    selStart = iso;
                    selEnd = null;
                } else {
                    selEnd = iso;
                }
                updateRanges();
            }

            function updateRanges() {
                const sT = selStart && new Date(selStart).getTime();
                const eT = selEnd && new Date(selEnd).getTime();
                document.querySelectorAll('.day[data-date]').forEach(el => {
                    const d = el.dataset.date,
                        t = new Date(d).getTime();
                    el.classList.remove('selected', 'range-start', 'range-mid', 'range-end', 'today');
                    if (d === new Date().toISOString().slice(0, 10)) {
                        el.classList.add('today');
                    }
                    if (d === selStart) el.classList.add('selected', 'range-start');
                    if (d === selEnd) el.classList.add('selected', 'range-end');
                    if (selStart && selEnd) {
                        if ((t > sT && t < eT) || (t > eT && t < sT)) {
                            el.classList.add('range-mid');
                        }
                    }
                });
            }

            // move both panels together
            document.querySelectorAll('.nav.prev').forEach(btn =>
                btn.addEventListener('click', () => {
                    viewM--;
                    if (viewM < 1) {
                        viewM = 12;
                        viewY--;
                    }
                    renderAll();
                    updateRanges();
                })
            );
            document.querySelectorAll('.nav.next').forEach(btn =>
                btn.addEventListener('click', () => {
                    viewM++;
                    if (viewM > 12) {
                        viewM = 1;
                        viewY++;
                    }
                    renderAll();
                    updateRanges();
                })
            );

            // init
            renderAll();
            updateRanges();
        })();