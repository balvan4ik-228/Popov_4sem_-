export class ReportDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="detail-layout">
                <div class="detail-card">
                    <div class="detail-body">
                        <h2 class="detail-title">${data.title}</h2>

                        <div class="report-meta">
                            <span class="meta-pill">${data.period}</span>
                            <span class="meta-pill">${data.status}</span>
                            <span class="meta-pill">${data.category}</span>
                        </div>

                        <p class="detail-text">${data.summary}</p>

                        <div class="detail-actions">
                            <button class="button-secondary" id="edit-current-report">Редактировать</button>
                        </div>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-body">
                        <h3 class="report-card-title">Пояснение</h3>
                        <ul class="summary-list">
                            <li>На этой странице данные загружаются по API по id.</li>
                            <li>Кнопка редактирования открывает форму с уже заполненными полями.</li>
                            <li>В 5-й лабораторной кнопки сохранения нет.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(editListener) {
        document
            .getElementById('edit-current-report')
            .addEventListener('click', editListener);
    }

    render(data, editListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(editListener);
    }
}