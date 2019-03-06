//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private _view: fairygui.GComponent;

    private phase: number;

    private firstNum: egret.Bitmap;
    private secondNum: egret.Bitmap;
    private sign: egret.Bitmap;

    private async runGame() {
        await this.loadResource()


        fairygui.UIPackage.addPackage("sign_atlas");



        this.stage.addChild(fairygui.GRoot.inst.displayObject);

        this._view = fairygui.UIPackage.createObject("Package1", "ControlPanel").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this._view.touchable = true;
        fairygui.GRoot.inst.addChild(this._view);

        // this._view.getChild("n0").asImage.touchable;
        // this._view.getChild("n1").asImage.touchable;
        // this._view.getChild("n2").asImage.touchable;
        // console.log(this._view.touchable);
        // this._view.getChild("n0").asImage.addClickListener(this.onSigntouched, this);
        // this._view.getChild("n1").asImage.addClickListener(this.onSigntouched, this);
        // this._view.getChild("n2").asImage.addClickListener(this.onSigntouched, this);
        // this._view.getChild("n3").asImage.addClickListener(this.onSigntouched, this);

        let num: egret.Bitmap;

        var nums = [1, 2, 3, 4];

        for (var i = 0; i < 4; i++) {
            num = new egret.Bitmap();
            num.texture = RES.getRes(String(nums[i] + "_png"));
            num.name = String(nums[i]);
            num.x = 100 + 100 * i;
            num.touchEnabled = true;
            this.stage.addChild(num);
            num.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNumTouched, this);
        }

        this.phase = 0;

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);

        this.firstNum = new egret.Bitmap();
        this.firstNum.x = 100;
        this.firstNum.y = 500;
        this.firstNum.visible = false;
        this.stage.addChild(this.firstNum);

        this.secondNum = new egret.Bitmap();
        this.secondNum.x = 400;
        this.secondNum.y = 500;
        this.secondNum.visible = false;
        this.stage.addChild(this.secondNum);

        this.sign = new egret.Bitmap();
        this.sign.x = 250;
        this.sign.y = 500;
        this.sign.visible = false;
        this.stage.addChild(this.sign);

        // this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);

    }

    private update(e: egret.Event) {
        switch (this.phase) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                this.phase = 0;
        }
    }

    private onNumTouched(e: egret.TouchEvent) {
        let clickNum = e.target as egret.Bitmap;
        switch (this.phase) {
            case 0:
                this.firstNum.visible = true;
                this.firstNum.texture = clickNum.texture;
                this.phase = 1;
                console.log(this.phase);
                break;
            case 1:
                this.firstNum.texture = clickNum.texture;
                console.log(this.phase);
                break;
            case 2:
                this.secondNum.texture = clickNum.texture;
                this.secondNum.visible = true;
                this.phase = 3;
                break;
            case 3:
                break;
            default:

        }
    }


    private onSigntouched(e: egret.TouchEvent) {
        console.log("123");
        let clickNum = e.target as egret.Bitmap;
        switch (this.phase) {
            case 0:
                break;
            case 1:
                this.sign.texture = clickNum.texture;
                this.sign.visible = true;
                this.phase = 2;
                break;
            case 2:
                break;
            case 3:
                break;
            default:
        }
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {





    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}