export class ReportFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data = null) {
        const report = data || {
            title: '',
            category: '',
            status: '',
            period: '',
            summary: ''
        };

        const pageTitle = data ? 'Редактирование отчёта' : 'Добавление отчёта';

        return `
            <div class="form-layout">
                <div class="form-card">
                    <div class="form-body">
                        <h2 class="detail-title">${pageTitle}</h2>
                        <p class="form-text">
                            В 5-й лабораторной форме уже можно вводить данные, но кнопка сохранения
                            и отправка на сервер появятся только в 6-й лабораторной.
                        </p>

                        <div class="form-grid">
                            <div class="form-field">
                                <label class="form-label" for="report-title">Название</label>
                                <input class="input" id="report-title" type="text" value="${report.title}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-category">Категория</label>
                                <input class="input" id="report-category" type="text" value="${report.category}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-status">Статус</label>
                                <input class="input" id="report-status" type="text" value="${report.status}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-period">Период</label>
                                <input class="input" id="report-period" type="text" value="${report.period}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-summary">Описание</label>
                                <textarea class="textarea" id="report-summary">${report.summary}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}