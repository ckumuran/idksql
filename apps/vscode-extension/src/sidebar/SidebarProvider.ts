import * as vscode from "vscode";

export class SidebarProvider
implements vscode.WebviewViewProvider {

    public static readonly viewType =
        "idksql.sidebar";

    private _view?:
        vscode.WebviewView;

    constructor(
        private readonly context:
        vscode.ExtensionContext
    ) {}

    resolveWebviewView(

        webviewView:
        vscode.WebviewView

    ) {

        this._view =
            webviewView;

        webviewView.webview.options = {

            enableScripts: true
        };

        webviewView.webview.html =
            this.getHTML();
    }

    private getHTML() {

        return `

        <html>

        <body
            style="
                background:#050505;
                color:white;
                font-family:monospace;
                padding:20px;
            "
        >

            <h1
                style="
                    color:#ff3b3b;
                    letter-spacing:4px;
                "
            >
                IDKSQL
            </h1>

            <div
                style="
                    margin-top:30px;
                    color:#888;
                    font-size:12px;
                    letter-spacing:2px;
                "
            >
                DATABASES
            </div>

            <div
                style="
                    margin-top:20px;
                "
            >

                <div
                    style="
                        margin-bottom:20px;
                    "
                >

                    <div
                        style="
                            color:#ff4d4d;
                            margin-bottom:8px;
                        "
                    >
                        MYSQL
                    </div>

                    <div
                        style="
                            padding-left:15px;
                            color:#aaa;
                            line-height:1.8;
                        "
                    >
                        users<br>
                        orders<br>
                        payments
                    </div>

                </div>

                <div>

                    <div
                        style="
                            color:#ff4d4d;
                            margin-bottom:8px;
                        "
                    >
                        POSTGRES
                    </div>

                    <div
                        style="
                            padding-left:15px;
                            color:#aaa;
                            line-height:1.8;
                        "
                    >
                        employees<br>
                        payroll
                    </div>

                </div>

            </div>

        </body>

        </html>
        `;
    }
}
