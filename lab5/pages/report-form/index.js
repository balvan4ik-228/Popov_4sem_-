import { reportApi } from "../../modules/reportApi.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ReportFormComponent } from "../../components/report-form/index.js";
import { MainPage } from "../main/index.js";

export class ReportFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('report-form-page');
    }

    getHTML() {
        return `
            <div class="container">
                <div id="report-form-page"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    renderCreateForm() {
        const form = new ReportFormComponent(this.pageRoot);
        form.render(null);
    }

    renderEditForm() {
        reportApi.getReportById(this.id, (data, status) => {
            if (status !== 200 || !data) {
                this.pageRoot.insertAdjacentHTML(
                    'beforeend',
                    `<div class="error-note">Не удалось загрузить данные для редактирования.</div>`
                );
                return;
            }

            const form = new ReportFormComponent(this.pageRoot);
            form.render(data);
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(() => this.clickBack());

        if (this.id) {
            this.renderEditForm();
        } else {
            this.renderCreateForm();
        }
    }
}