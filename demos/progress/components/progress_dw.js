"use strict";
(function() {
    function Progress(container) {
        this.container = container;
        this.init();
    }
    Progress.prototype = {
        init: function() {
            var container = this.container;
            var dpr = window.devicePixelRatio || 1;
            this.dpr = dpr;
            this.width = container.offsetWidth * dpr;
            this.height = (container.offsetHeight < 20 ? 20 : container.offsetHeight) * dpr;
            this.r = Math.min(this.width, this.height) * 2 / 5;

            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', this.width);
            canvas.setAttribute('height', this.height);
            canvas.style.width = this.width / dpr + 'px';
            canvas.style.height = this.height / dpr + 'px';
            container.appendChild(canvas);
            this.context = canvas.getContext('2d');
            return this;
        },
        circleProgress: function(percent) {
            var context = this.context;
            context.clearRect(0, 0, this.width, this.height);

            context.beginPath();
            context.arc(this.width / 2, this.height / 2, this.r, 0, 2 * Math.PI, false);
            context.strokeStyle = '#dcdcdc';
            //context.shadowBlur = 10; // 模糊尺寸
            //context.shadowColor = '#f07e7e'; // 颜色
            context.lineWidth = this.r / 2;
            context.stroke();

            context.beginPath();
            context.arc(this.width / 2, this.height / 2, this.r, -Math.PI / 2, 2 * percent * Math.PI - Math.PI / 2, false);
            context.strokeStyle = '#f66b6b';
            context.stroke();

            context.beginPath();
            var fontSize = this.r / 3;
            context.font = fontSize + 'px "楷体"';
            context.fillStyle = '#333';
            var txt = Math.round(percent * 100) + '%',
                txtMd = context.measureText(txt).width / 2;
            context.fillText(txt, this.width / 2 - txtMd, this.height / 2 + fontSize / 2);
        },
        lineProgress: function(percent) {
            var context = this.context;

            var fontSize = this.height / 6;
            context.font = ((fontSize < 15 ? 15 : fontSize) * this.dpr) + 'px "楷体"';
            var txtWidth = context.measureText('100%').width;

            var lineWidth = this.height / 5,
                start = lineWidth,
                end = this.width - start - txtWidth,
                y = this.height / 2;

            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.moveTo(start, y);
            context.lineTo(end, y);
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.strokeStyle = '#dcdcdc';
            context.stroke();

            context.beginPath();
            context.moveTo(start, y);
            context.lineTo(percent * (this.width - 2 * start - txtWidth) + start, y);
            context.strokeStyle = '#f66b6b';
            context.stroke();

            context.beginPath();
            var txt = Math.round(percent * 100) + '%';
            context.fillStyle = '#333';
            context.fillText(txt, end + start, y + fontSize / 3);
        }
    };
    module.exports = Progress;
})();
