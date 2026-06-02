export class ReportCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="report-card">
                <div class="report-card-body">
                    <h3 class="report-card-title">${data.title}</h3>
                    <p class="report-card-text">${data.summary}</p>

                    <div class="report-meta">
                        <span class="meta-pill">${data.period}</span>
                        <span class="meta-pill">${data.status}</span>
                        <span class="meta-pill">${data.category}</span>
                    </div>

                    <div class="card-actions">
                        <button class="button" id="open-report-${data.id}">Открыть</button>
                        <button class="button-secondary" id="edit-report-${data.id}">Редактировать</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener, editListener) {
        document
            .getElementById(`open-report-${data.id}`)
            .addEventListener('click', openListener);

        document
            .getElementById(`edit-report-${data.id}`)
            .addEventListener('click', editListener);
    }

    render(data, openListener, editListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, openListener, editListener);
    }
}