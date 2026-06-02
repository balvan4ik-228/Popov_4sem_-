import { reportApi } from "../../modules/reportApi.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ReportDetailComponent } from "../../components/report-detail/index.js";
import { MainPage } from "../main/index.js";
import { ReportFormPage } from "../report-form/index.js";

export class ReportPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('report-page');
    }

    getHTML() {
        return `
            <div class="container">
                <div id="report-page"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(() => this.clickBack());

        reportApi.getReportById(this.id, (data, status) => {
            if (status !== 200 || !data) {
                this.pageRoot.insertAdjacentHTML(
                    'beforeend',
                    `<div class="error-note">Не удалось загрузить отчёт по id.</div>`
                );
                return;
            }

            const detail = new ReportDetailComponent(this.pageRoot);
            detail.render(data, () => {
                const formPage = new ReportFormPage(this.parent, this.id);
                formPage.render();
            });
        });
    }
}