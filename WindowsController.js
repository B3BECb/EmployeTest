"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WindowsController {
    ShowStartDialog() {
        let node = document
            .querySelector("#startDialog")
            .content
            .cloneNode(true);
        this.SetPage(node);
    }
    SetPage(element) {
        let body = document.querySelector("#mainContainer");
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        body.appendChild(element);
    }
}
exports.WindowsController = WindowsController;
//# sourceMappingURL=WindowsController.js.map