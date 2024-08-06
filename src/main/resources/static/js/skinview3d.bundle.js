!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).skinview3d = {})
}(this, function (e) {
    "use strict";
    let t, i;
    let r = {LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2},
        a = {ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3}, n = "srgb", s = "srgb-linear", o = "display-p3",
        l = "300 es";

    class h {
        addEventListener(e, t) {
            void 0 === this._listeners && (this._listeners = {});
            let i = this._listeners;
            void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t)
        }

        hasEventListener(e, t) {
            if (void 0 === this._listeners) return !1;
            let i = this._listeners;
            return void 0 !== i[e] && -1 !== i[e].indexOf(t)
        }

        removeEventListener(e, t) {
            if (void 0 === this._listeners) return;
            let i = this._listeners, r = i[e];
            if (void 0 !== r) {
                let e = r.indexOf(t);
                -1 !== e && r.splice(e, 1)
            }
        }

        dispatchEvent(e) {
            if (void 0 === this._listeners) return;
            let t = this._listeners, i = t[e.type];
            if (void 0 !== i) {
                e.target = this;
                let t = i.slice(0);
                for (let i = 0, r = t.length; i < r; i++) t[i].call(this, e);
                e.target = null
            }
        }
    }

    let c = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"],
        u = Math.PI / 180, d = 180 / Math.PI;

    function p() {
        let e = 4294967295 * Math.random() | 0, t = 4294967295 * Math.random() | 0, i = 4294967295 * Math.random() | 0,
            r = 4294967295 * Math.random() | 0,
            a = c[255 & e] + c[e >> 8 & 255] + c[e >> 16 & 255] + c[e >> 24 & 255] + "-" + c[255 & t] + c[t >> 8 & 255] + "-" + c[t >> 16 & 15 | 64] + c[t >> 24 & 255] + "-" + c[63 & i | 128] + c[i >> 8 & 255] + "-" + c[i >> 16 & 255] + c[i >> 24 & 255] + c[255 & r] + c[r >> 8 & 255] + c[r >> 16 & 255] + c[r >> 24 & 255];
        return a.toLowerCase()
    }

    function f(e, t, i) {
        return Math.max(t, Math.min(i, e))
    }

    function m(e) {
        return (e & e - 1) == 0 && 0 !== e
    }

    function g(e) {
        return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
    }

    function v(e, t) {
        switch (t.constructor) {
            case Float32Array:
                return e;
            case Uint32Array:
                return e / 4294967295;
            case Uint16Array:
                return e / 65535;
            case Uint8Array:
                return e / 255;
            case Int32Array:
                return Math.max(e / 2147483647, -1);
            case Int16Array:
                return Math.max(e / 32767, -1);
            case Int8Array:
                return Math.max(e / 127, -1);
            default:
                throw Error("Invalid component type.")
        }
    }

    function _(e, t) {
        switch (t.constructor) {
            case Float32Array:
                return e;
            case Uint32Array:
                return Math.round(4294967295 * e);
            case Uint16Array:
                return Math.round(65535 * e);
            case Uint8Array:
                return Math.round(255 * e);
            case Int32Array:
                return Math.round(2147483647 * e);
            case Int16Array:
                return Math.round(32767 * e);
            case Int8Array:
                return Math.round(127 * e);
            default:
                throw Error("Invalid component type.")
        }
    }

    class x {
        constructor(e = 0, t = 0) {
            x.prototype.isVector2 = !0, this.x = e, this.y = t
        }

        get width() {
            return this.x
        }

        set width(e) {
            this.x = e
        }

        get height() {
            return this.y
        }

        set height(e) {
            this.y = e
        }

        set(e, t) {
            return this.x = e, this.y = t, this
        }

        setScalar(e) {
            return this.x = e, this.y = e, this
        }

        setX(e) {
            return this.x = e, this
        }

        setY(e) {
            return this.y = e, this
        }

        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                default:
                    throw Error("index is out of range: " + e)
            }
            return this
        }

        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw Error("index is out of range: " + e)
            }
        }

        clone() {
            return new this.constructor(this.x, this.y)
        }

        copy(e) {
            return this.x = e.x, this.y = e.y, this
        }

        add(e) {
            return this.x += e.x, this.y += e.y, this
        }

        addScalar(e) {
            return this.x += e, this.y += e, this
        }

        addVectors(e, t) {
            return this.x = e.x + t.x, this.y = e.y + t.y, this
        }

        addScaledVector(e, t) {
            return this.x += e.x * t, this.y += e.y * t, this
        }

        sub(e) {
            return this.x -= e.x, this.y -= e.y, this
        }

        subScalar(e) {
            return this.x -= e, this.y -= e, this
        }

        subVectors(e, t) {
            return this.x = e.x - t.x, this.y = e.y - t.y, this
        }

        multiply(e) {
            return this.x *= e.x, this.y *= e.y, this
        }

        multiplyScalar(e) {
            return this.x *= e, this.y *= e, this
        }

        divide(e) {
            return this.x /= e.x, this.y /= e.y, this
        }

        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }

        applyMatrix3(e) {
            let t = this.x, i = this.y, r = e.elements;
            return this.x = r[0] * t + r[3] * i + r[6], this.y = r[1] * t + r[4] * i + r[7], this
        }

        min(e) {
            return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this
        }

        max(e) {
            return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this
        }

        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this
        }

        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this
        }

        clampLength(e, t) {
            let i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }

        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        }

        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        }

        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }

        roundToZero() {
            return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this
        }

        negate() {
            return this.x = -this.x, this.y = -this.y, this
        }

        dot(e) {
            return this.x * e.x + this.y * e.y
        }

        cross(e) {
            return this.x * e.y - this.y * e.x
        }

        lengthSq() {
            return this.x * this.x + this.y * this.y
        }

        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }

        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y)
        }

        normalize() {
            return this.divideScalar(this.length() || 1)
        }

        angle() {
            let e = Math.atan2(-this.y, -this.x) + Math.PI;
            return e
        }

        angleTo(e) {
            let t = Math.sqrt(this.lengthSq() * e.lengthSq());
            if (0 === t) return Math.PI / 2;
            let i = this.dot(e) / t;
            return Math.acos(f(i, -1, 1))
        }

        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e))
        }

        distanceToSquared(e) {
            let t = this.x - e.x, i = this.y - e.y;
            return t * t + i * i
        }

        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
        }

        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }

        lerp(e, t) {
            return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
        }

        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this
        }

        equals(e) {
            return e.x === this.x && e.y === this.y
        }

        fromArray(e, t = 0) {
            return this.x = e[t], this.y = e[t + 1], this
        }

        toArray(e = [], t = 0) {
            return e[t] = this.x, e[t + 1] = this.y, e
        }

        fromBufferAttribute(e, t) {
            return this.x = e.getX(t), this.y = e.getY(t), this
        }

        rotateAround(e, t) {
            let i = Math.cos(t), r = Math.sin(t), a = this.x - e.x, n = this.y - e.y;
            return this.x = a * i - n * r + e.x, this.y = a * r + n * i + e.y, this
        }

        random() {
            return this.x = Math.random(), this.y = Math.random(), this
        }

        * [Symbol.iterator]() {
            yield this.x, yield this.y
        }
    }

    class y {
        constructor(e, t, i, r, a, n, s, o, l) {
            y.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], void 0 !== e && this.set(e, t, i, r, a, n, s, o, l)
        }

        set(e, t, i, r, a, n, s, o, l) {
            let h = this.elements;
            return h[0] = e, h[1] = r, h[2] = s, h[3] = t, h[4] = a, h[5] = o, h[6] = i, h[7] = n, h[8] = l, this
        }

        identity() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
        }

        copy(e) {
            let t = this.elements, i = e.elements;
            return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], this
        }

        extractBasis(e, t, i) {
            return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this
        }

        setFromMatrix4(e) {
            let t = e.elements;
            return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this
        }

        multiply(e) {
            return this.multiplyMatrices(this, e)
        }

        premultiply(e) {
            return this.multiplyMatrices(e, this)
        }

        multiplyMatrices(e, t) {
            let i = e.elements, r = t.elements, a = this.elements, n = i[0], s = i[3], o = i[6], l = i[1], h = i[4],
                c = i[7], u = i[2], d = i[5], p = i[8], f = r[0], m = r[3], g = r[6], v = r[1], _ = r[4], x = r[7],
                y = r[2], M = r[5], S = r[8];
            return a[0] = n * f + s * v + o * y, a[3] = n * m + s * _ + o * M, a[6] = n * g + s * x + o * S, a[1] = l * f + h * v + c * y, a[4] = l * m + h * _ + c * M, a[7] = l * g + h * x + c * S, a[2] = u * f + d * v + p * y, a[5] = u * m + d * _ + p * M, a[8] = u * g + d * x + p * S, this
        }

        multiplyScalar(e) {
            let t = this.elements;
            return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
        }

        determinant() {
            let e = this.elements, t = e[0], i = e[1], r = e[2], a = e[3], n = e[4], s = e[5], o = e[6], l = e[7],
                h = e[8];
            return t * n * h - t * s * l - i * a * h + i * s * o + r * a * l - r * n * o
        }

        invert() {
            let e = this.elements, t = e[0], i = e[1], r = e[2], a = e[3], n = e[4], s = e[5], o = e[6], l = e[7],
                h = e[8], c = h * n - s * l, u = s * o - h * a, d = l * a - n * o, p = t * c + i * u + r * d;
            if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            let f = 1 / p;
            return e[0] = c * f, e[1] = (r * l - h * i) * f, e[2] = (s * i - r * n) * f, e[3] = u * f, e[4] = (h * t - r * o) * f, e[5] = (r * a - s * t) * f, e[6] = d * f, e[7] = (i * o - l * t) * f, e[8] = (n * t - i * a) * f, this
        }

        transpose() {
            let e;
            let t = this.elements;
            return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
        }

        getNormalMatrix(e) {
            return this.setFromMatrix4(e).invert().transpose()
        }

        transposeIntoArray(e) {
            let t = this.elements;
            return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
        }

        setUvTransform(e, t, i, r, a, n, s) {
            let o = Math.cos(a), l = Math.sin(a);
            return this.set(i * o, i * l, -i * (o * n + l * s) + n + e, -r * l, r * o, -r * (-l * n + o * s) + s + t, 0, 0, 1), this
        }

        scale(e, t) {
            return this.premultiply(M.makeScale(e, t)), this
        }

        rotate(e) {
            return this.premultiply(M.makeRotation(-e)), this
        }

        translate(e, t) {
            return this.premultiply(M.makeTranslation(e, t)), this
        }

        makeTranslation(e, t) {
            return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this
        }

        makeRotation(e) {
            let t = Math.cos(e), i = Math.sin(e);
            return this.set(t, -i, 0, i, t, 0, 0, 0, 1), this
        }

        makeScale(e, t) {
            return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this
        }

        equals(e) {
            let t = this.elements, i = e.elements;
            for (let e = 0; e < 9; e++) if (t[e] !== i[e]) return !1;
            return !0
        }

        fromArray(e, t = 0) {
            for (let i = 0; i < 9; i++) this.elements[i] = e[i + t];
            return this
        }

        toArray(e = [], t = 0) {
            let i = this.elements;
            return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e
        }

        clone() {
            return new this.constructor().fromArray(this.elements)
        }
    }

    let M = new y;

    function S(e) {
        for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
        return !1
    }

    function b(e) {
        return document.createElementNS("http://www.w3.org/1999/xhtml", e)
    }

    let w = {};

    function T(e) {
        e in w || (w[e] = !0, console.warn(e))
    }

    function E(e) {
        return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4)
    }

    function A(e) {
        return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055
    }

    let C = new y().fromArray([.8224621, .0331941, .0170827, .177538, .9668058, .0723974, -.0000001, 1e-7, .9105199]),
        L = new y().fromArray([1.2249401, -.0420569, -.0196376, -.2249404, 1.0420571, -.0786361, 1e-7, 0, 1.0982735]),
        P = {
            [s]: e => e, [n]: e => e.convertSRGBToLinear(), [o]: function (e) {
                return e.convertSRGBToLinear().applyMatrix3(L)
            }
        }, R = {
            [s]: e => e, [n]: e => e.convertLinearToSRGB(), [o]: function (e) {
                return e.applyMatrix3(C).convertLinearToSRGB()
            }
        }, D = {
            enabled: !0, get legacyMode() {
                return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), !this.enabled
            }, set legacyMode(legacyMode) {
                console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), this.enabled = !legacyMode
            }, get workingColorSpace() {
                return s
            }, set workingColorSpace(colorSpace) {
                console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")
            }, convert: function (e, t, i) {
                if (!1 === this.enabled || t === i || !t || !i) return e;
                let r = P[t], a = R[i];
                if (void 0 === r || void 0 === a) throw Error(`Unsupported color space conversion, "${t}" to "${i}".`);
                return a(r(e))
            }, fromWorkingColorSpace: function (e, t) {
                return this.convert(e, this.workingColorSpace, t)
            }, toWorkingColorSpace: function (e, t) {
                return this.convert(e, t, this.workingColorSpace)
            }
        };

    class U {
        static getDataURL(e) {
            let i;
            if (/^data:/i.test(e.src) || "undefined" == typeof HTMLCanvasElement) return e.src;
            if (e instanceof HTMLCanvasElement) i = e; else {
                void 0 === t && (t = b("canvas")), t.width = e.width, t.height = e.height;
                let r = t.getContext("2d");
                e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), i = t
            }
            return i.width > 2048 || i.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), i.toDataURL("image/jpeg", .6)) : i.toDataURL("image/png")
        }

        static sRGBToLinear(e) {
            if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                let t = b("canvas");
                t.width = e.width, t.height = e.height;
                let i = t.getContext("2d");
                i.drawImage(e, 0, 0, e.width, e.height);
                let r = i.getImageData(0, 0, e.width, e.height), a = r.data;
                for (let e = 0; e < a.length; e++) a[e] = 255 * E(a[e] / 255);
                return i.putImageData(r, 0, 0), t
            }
            if (!e.data) return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
            {
                let t = e.data.slice(0);
                for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(255 * E(t[e] / 255)) : t[e] = E(t[e]);
                return {data: t, width: e.width, height: e.height}
            }
        }
    }

    let I = 0;

    class N {
        constructor(e = null) {
            this.isSource = !0, Object.defineProperty(this, "id", {value: I++}), this.uuid = p(), this.data = e, this.version = 0
        }

        set needsUpdate(e) {
            !0 === e && this.version++
        }

        toJSON(e) {
            let t = void 0 === e || "string" == typeof e;
            if (!t && void 0 !== e.images[this.uuid]) return e.images[this.uuid];
            let i = {uuid: this.uuid, url: ""}, r = this.data;
            if (null !== r) {
                let e;
                if (Array.isArray(r)) {
                    e = [];
                    for (let t = 0, i = r.length; t < i; t++) r[t].isDataTexture ? e.push(O(r[t].image)) : e.push(O(r[t]))
                } else e = O(r);
                i.url = e
            }
            return t || (e.images[this.uuid] = i), i
        }
    }

    function O(e) {
        return "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap ? U.getDataURL(e) : e.data ? {
            data: Array.from(e.data),
            width: e.width,
            height: e.height,
            type: e.data.constructor.name
        } : (console.warn("THREE.Texture: Unable to serialize Texture."), {})
    }

    let z = 0;

    class F extends h {
        constructor(e = F.DEFAULT_IMAGE, t = F.DEFAULT_MAPPING, i = 1001, r = 1001, a = 1006, s = 1008, o = 1023, l = 1009, h = F.DEFAULT_ANISOTROPY, c = "") {
            super(), this.isTexture = !0, Object.defineProperty(this, "id", {value: z++}), this.uuid = p(), this.name = "", this.source = new N(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = a, this.minFilter = s, this.anisotropy = h, this.format = o, this.internalFormat = null, this.type = l, this.offset = new x(0, 0), this.repeat = new x(1, 1), this.center = new x(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new y, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, "string" == typeof c ? this.colorSpace = c : (T("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = 3001 === c ? n : ""), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1
        }

        get image() {
            return this.source.data
        }

        set image(e = null) {
            this.source.data = e
        }

        updateMatrix() {
            this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
        }

        clone() {
            return new this.constructor().copy(this)
        }

        copy(e) {
            return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this
        }

        toJSON(e) {
            let t = void 0 === e || "string" == typeof e;
            if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
            let i = {
                metadata: {version: 4.6, type: "Texture", generator: "Texture.toJSON"},
                uuid: this.uuid,
                name: this.name,
                image: this.source.toJSON(e).uuid,
                mapping: this.mapping,
                channel: this.channel,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                center: [this.center.x, this.center.y],
                rotation: this.rotation,
                wrap: [this.wrapS, this.wrapT],
                format: this.format,
                internalFormat: this.internalFormat,
                type: this.type,
                colorSpace: this.colorSpace,
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY,
                generateMipmaps: this.generateMipmaps,
                premultiplyAlpha: this.premultiplyAlpha,
                unpackAlignment: this.unpackAlignment
            };
            return Object.keys(this.userData).length > 0 && (i.userData = this.userData), t || (e.textures[this.uuid] = i), i
        }

        dispose() {
            this.dispatchEvent({type: "dispose"})
        }

        transformUv(e) {
            if (300 !== this.mapping) return e;
            if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
                case 1e3:
                    e.x = e.x - Math.floor(e.x);
                    break;
                case 1001:
                    e.x = e.x < 0 ? 0 : 1;
                    break;
                case 1002:
                    1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x)
            }
            if (e.y < 0 || e.y > 1) switch (this.wrapT) {
                case 1e3:
                    e.y = e.y - Math.floor(e.y);
                    break;
                case 1001:
                    e.y = e.y < 0 ? 0 : 1;
                    break;
                case 1002:
                    1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y)
            }
            return this.flipY && (e.y = 1 - e.y), e
        }

        set needsUpdate(e) {
            !0 === e && (this.version++, this.source.needsUpdate = !0)
        }

        get encoding() {
            return T("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === n ? 3001 : 3e3
        }

        set encoding(e) {
            T("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = 3001 === e ? n : ""
        }
    }

    F.DEFAULT_IMAGE = null, F.DEFAULT_MAPPING = 300, F.DEFAULT_ANISOTROPY = 1;

    class B {
        constructor(e = 0, t = 0, i = 0, r = 1) {
            B.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = i, this.w = r
        }

        get width() {
            return this.z
        }

        set width(e) {
            this.z = e
        }

        get height() {
            return this.w
        }

        set height(e) {
            this.w = e
        }

        set(e, t, i, r) {
            return this.x = e, this.y = t, this.z = i, this.w = r, this
        }

        setScalar(e) {
            return this.x = e, this.y = e, this.z = e, this.w = e, this
        }

        setX(e) {
            return this.x = e, this
        }

        setY(e) {
            return this.y = e, this
        }

        setZ(e) {
            return this.z = e, this
        }

        setW(e) {
            return this.w = e, this
        }

        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                case 3:
                    this.w = t;
                    break;
                default:
                    throw Error("index is out of range: " + e)
            }
            return this
        }

        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw Error("index is out of range: " + e)
            }
        }

        clone() {
            return new this.constructor(this.x, this.y, this.z, this.w)
        }

        copy(e) {
            return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
        }

        add(e) {
            return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this
        }

        addScalar(e) {
            return this.x += e, this.y += e, this.z += e, this.w += e, this
        }

        addVectors(e, t) {
            return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
        }

        addScaledVector(e, t) {
            return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this
        }

        sub(e) {
            return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this
        }

        subScalar(e) {
            return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
        }

        subVectors(e, t) {
            return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
        }

        multiply(e) {
            return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this
        }

        multiplyScalar(e) {
            return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
        }

        applyMatrix4(e) {
            let t = this.x, i = this.y, r = this.z, a = this.w, n = e.elements;
            return this.x = n[0] * t + n[4] * i + n[8] * r + n[12] * a, this.y = n[1] * t + n[5] * i + n[9] * r + n[13] * a, this.z = n[2] * t + n[6] * i + n[10] * r + n[14] * a, this.w = n[3] * t + n[7] * i + n[11] * r + n[15] * a, this
        }

        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }

        setAxisAngleFromQuaternion(e) {
            this.w = 2 * Math.acos(e.w);
            let t = Math.sqrt(1 - e.w * e.w);
            return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
        }

        setAxisAngleFromRotationMatrix(e) {
            let t, i, r;
            let a = e.elements, n = a[0], s = a[4], o = a[8], l = a[1], h = a[5], c = a[9], u = a[2], d = a[6],
                p = a[10];
            if (.01 > Math.abs(s - l) && .01 > Math.abs(o - u) && .01 > Math.abs(c - d)) {
                if (.1 > Math.abs(s + l) && .1 > Math.abs(o + u) && .1 > Math.abs(c + d) && .1 > Math.abs(n + h + p - 3)) return this.set(1, 0, 0, 0), this;
                let e = (n + 1) / 2, a = (h + 1) / 2, f = (p + 1) / 2, m = (s + l) / 4, g = (o + u) / 4,
                    v = (c + d) / 4;
                return e > a && e > f ? e < .01 ? (t = 0, i = .707106781, r = .707106781) : (i = m / (t = Math.sqrt(e)), r = g / t) : a > f ? a < .01 ? (t = .707106781, i = 0, r = .707106781) : (t = m / (i = Math.sqrt(a)), r = v / i) : f < .01 ? (t = .707106781, i = .707106781, r = 0) : (t = g / (r = Math.sqrt(f)), i = v / r), this.set(t, i, r, Math.PI), this
            }
            let f = Math.sqrt((d - c) * (d - c) + (o - u) * (o - u) + (l - s) * (l - s));
            return .001 > Math.abs(f) && (f = 1), this.x = (d - c) / f, this.y = (o - u) / f, this.z = (l - s) / f, this.w = Math.acos((n + h + p - 1) / 2), this
        }

        min(e) {
            return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this
        }

        max(e) {
            return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this
        }

        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this
        }

        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this
        }

        clampLength(e, t) {
            let i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }

        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
        }

        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
        }

        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
        }

        roundToZero() {
            return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this
        }

        negate() {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
        }

        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
        }

        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        }

        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        }

        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        }

        normalize() {
            return this.divideScalar(this.length() || 1)
        }

        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }

        lerp(e, t) {
            return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
        }

        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this.w = e.w + (t.w - e.w) * i, this
        }

        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
        }

        fromArray(e, t = 0) {
            return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
        }

        toArray(e = [], t = 0) {
            return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
        }

        fromBufferAttribute(e, t) {
            return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this
        }

        random() {
            return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this
        }

        * [Symbol.iterator]() {
            yield this.x, yield this.y, yield this.z, yield this.w
        }
    }

    class k extends h {
        constructor(e = 1, t = 1, i = {}) {
            super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new B(0, 0, e, t), this.scissorTest = !1, this.viewport = new B(0, 0, e, t), void 0 !== i.encoding && (T("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), i.colorSpace = 3001 === i.encoding ? n : ""), this.texture = new F({
                width: e,
                height: t,
                depth: 1
            }, i.mapping, i.wrapS, i.wrapT, i.magFilter, i.minFilter, i.format, i.type, i.anisotropy, i.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = void 0 !== i.generateMipmaps && i.generateMipmaps, this.texture.internalFormat = void 0 !== i.internalFormat ? i.internalFormat : null, this.texture.minFilter = void 0 !== i.minFilter ? i.minFilter : 1006, this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer, this.stencilBuffer = void 0 !== i.stencilBuffer && i.stencilBuffer, this.depthTexture = void 0 !== i.depthTexture ? i.depthTexture : null, this.samples = void 0 !== i.samples ? i.samples : 0
        }

        setSize(e, t, i = 1) {
            (this.width !== e || this.height !== t || this.depth !== i) && (this.width = e, this.height = t, this.depth = i, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = i, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t)
        }

        clone() {
            return new this.constructor().copy(this)
        }

        copy(e) {
            this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.texture.isRenderTargetTexture = !0;
            let t = Object.assign({}, e.texture.image);
            return this.texture.source = new N(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, null !== e.depthTexture && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this
        }

        dispose() {
            this.dispatchEvent({type: "dispose"})
        }
    }

    class H extends k {
        constructor(e = 1, t = 1, i = {}) {
            super(e, t, i), this.isWebGLRenderTarget = !0
        }
    }

    class V extends F {
        constructor(e = null, t = 1, i = 1, r = 1) {
            super(null), this.isDataArrayTexture = !0, this.image = {
                data: e,
                width: t,
                height: i,
                depth: r
            }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
        }
    }

    class G {
        constructor(e = 0, t = 0, i = 0, r = 1) {
            this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = r
        }

        static slerpFlat(e, t, i, r, a, n, s) {
            let o = i[r + 0], l = i[r + 1], h = i[r + 2], c = i[r + 3], u = a[n + 0], d = a[n + 1], p = a[n + 2],
                f = a[n + 3];
            if (0 === s) {
                e[t + 0] = o, e[t + 1] = l, e[t + 2] = h, e[t + 3] = c;
                return
            }
            if (1 === s) {
                e[t + 0] = u, e[t + 1] = d, e[t + 2] = p, e[t + 3] = f;
                return
            }
            if (c !== f || o !== u || l !== d || h !== p) {
                let e = 1 - s, t = o * u + l * d + h * p + c * f, i = t >= 0 ? 1 : -1, r = 1 - t * t;
                if (r > Number.EPSILON) {
                    let a = Math.sqrt(r), n = Math.atan2(a, t * i);
                    e = Math.sin(e * n) / a, s = Math.sin(s * n) / a
                }
                let a = s * i;
                if (o = o * e + u * a, l = l * e + d * a, h = h * e + p * a, c = c * e + f * a, e === 1 - s) {
                    let e = 1 / Math.sqrt(o * o + l * l + h * h + c * c);
                    o *= e, l *= e, h *= e, c *= e
                }
            }
            e[t] = o, e[t + 1] = l, e[t + 2] = h, e[t + 3] = c
        }

        static multiplyQuaternionsFlat(e, t, i, r, a, n) {
            let s = i[r], o = i[r + 1], l = i[r + 2], h = i[r + 3], c = a[n], u = a[n + 1], d = a[n + 2], p = a[n + 3];
            return e[t] = s * p + h * c + o * d - l * u, e[t + 1] = o * p + h * u + l * c - s * d, e[t + 2] = l * p + h * d + s * u - o * c, e[t + 3] = h * p - s * c - o * u - l * d, e
        }

        get x() {
            return this._x
        }

        set x(e) {
            this._x = e, this._onChangeCallback()
        }

        get y() {
            return this._y
        }

        set y(e) {
            this._y = e, this._onChangeCallback()
        }

        get z() {
            return this._z
        }

        set z(e) {
            this._z = e, this._onChangeCallback()
        }

        get w() {
            return this._w
        }

        set w(e) {
            this._w = e, this._onChangeCallback()
        }

        set(e, t, i, r) {
            return this._x = e, this._y = t, this._z = i, this._w = r, this._onChangeCallback(), this
        }

        clone() {
            return new this.constructor(this._x, this._y, this._z, this._w)
        }

        copy(e) {
            return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this
        }

        setFromEuler(e, t) {
            let i = e._x, r = e._y, a = e._z, n = e._order, s = Math.cos, o = Math.sin, l = s(i / 2), h = s(r / 2),
                c = s(a / 2), u = o(i / 2), d = o(r / 2), p = o(a / 2);
            switch (n) {
                case"XYZ":
                    this._x = u * h * c + l * d * p, this._y = l * d * c - u * h * p, this._z = l * h * p + u * d * c, this._w = l * h * c - u * d * p;
                    break;
                case"YXZ":
                    this._x = u * h * c + l * d * p, this._y = l * d * c - u * h * p, this._z = l * h * p - u * d * c, this._w = l * h * c + u * d * p;
                    break;
                case"ZXY":
                    this._x = u * h * c - l * d * p, this._y = l * d * c + u * h * p, this._z = l * h * p + u * d * c, this._w = l * h * c - u * d * p;
                    break;
                case"ZYX":
                    this._x = u * h * c - l * d * p, this._y = l * d * c + u * h * p, this._z = l * h * p - u * d * c, this._w = l * h * c + u * d * p;
                    break;
                case"YZX":
                    this._x = u * h * c + l * d * p, this._y = l * d * c + u * h * p, this._z = l * h * p - u * d * c, this._w = l * h * c - u * d * p;
                    break;
                case"XZY":
                    this._x = u * h * c - l * d * p, this._y = l * d * c - u * h * p, this._z = l * h * p + u * d * c, this._w = l * h * c + u * d * p;
                    break;
                default:
                    console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + n)
            }
            return !1 !== t && this._onChangeCallback(), this
        }

        setFromAxisAngle(e, t) {
            let i = t / 2, r = Math.sin(i);
            return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(i), this._onChangeCallback(), this
        }

        setFromRotationMatrix(e) {
            let t = e.elements, i = t[0], r = t[4], a = t[8], n = t[1], s = t[5], o = t[9], l = t[2], h = t[6],
                c = t[10], u = i + s + c;
            if (u > 0) {
                let e = .5 / Math.sqrt(u + 1);
                this._w = .25 / e, this._x = (h - o) * e, this._y = (a - l) * e, this._z = (n - r) * e
            } else if (i > s && i > c) {
                let e = 2 * Math.sqrt(1 + i - s - c);
                this._w = (h - o) / e, this._x = .25 * e, this._y = (r + n) / e, this._z = (a + l) / e
            } else if (s > c) {
                let e = 2 * Math.sqrt(1 + s - i - c);
                this._w = (a - l) / e, this._x = (r + n) / e, this._y = .25 * e, this._z = (o + h) / e
            } else {
                let e = 2 * Math.sqrt(1 + c - i - s);
                this._w = (n - r) / e, this._x = (a + l) / e, this._y = (o + h) / e, this._z = .25 * e
            }
            return this._onChangeCallback(), this
        }

        setFromUnitVectors(e, t) {
            let i = e.dot(t) + 1;
            return i < Number.EPSILON ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize()
        }

        angleTo(e) {
            return 2 * Math.acos(Math.abs(f(this.dot(e), -1, 1)))
        }

        rotateTowards(e, t) {
            let i = this.angleTo(e);
            return 0 === i || this.slerp(e, Math.min(1, t / i)), this
        }

        identity() {
            return this.set(0, 0, 0, 1)
        }

        invert() {
            return this.conjugate()
        }

        conjugate() {
            return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this
        }

        dot(e) {
            return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
        }

        lengthSq() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        }

        length() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
        }

        normalize() {
            let e = this.length();
            return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this
        }

        multiply(e) {
            return this.multiplyQuaternions(this, e)
        }

        premultiply(e) {
            return this.multiplyQuaternions(e, this)
        }

        multiplyQuaternions(e, t) {
            let i = e._x, r = e._y, a = e._z, n = e._w, s = t._x, o = t._y, l = t._z, h = t._w;
            return this._x = i * h + n * s + r * l - a * o, this._y = r * h + n * o + a * s - i * l, this._z = a * h + n * l + i * o - r * s, this._w = n * h - i * s - r * o - a * l, this._onChangeCallback(), this
        }

        slerp(e, t) {
            if (0 === t) return this;
            if (1 === t) return this.copy(e);
            let i = this._x, r = this._y, a = this._z, n = this._w, s = n * e._w + i * e._x + r * e._y + a * e._z;
            if (s < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, s = -s) : this.copy(e), s >= 1) return this._w = n, this._x = i, this._y = r, this._z = a, this;
            let o = 1 - s * s;
            if (o <= Number.EPSILON) {
                let e = 1 - t;
                return this._w = e * n + t * this._w, this._x = e * i + t * this._x, this._y = e * r + t * this._y, this._z = e * a + t * this._z, this.normalize(), this._onChangeCallback(), this
            }
            let l = Math.sqrt(o), h = Math.atan2(l, s), c = Math.sin((1 - t) * h) / l, u = Math.sin(t * h) / l;
            return this._w = n * c + this._w * u, this._x = i * c + this._x * u, this._y = r * c + this._y * u, this._z = a * c + this._z * u, this._onChangeCallback(), this
        }

        slerpQuaternions(e, t, i) {
            return this.copy(e).slerp(t, i)
        }

        random() {
            let e = Math.random(), t = Math.sqrt(1 - e), i = Math.sqrt(e), r = 2 * Math.PI * Math.random(),
                a = 2 * Math.PI * Math.random();
            return this.set(t * Math.cos(r), i * Math.sin(a), i * Math.cos(a), t * Math.sin(r))
        }

        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
        }

        fromArray(e, t = 0) {
            return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this
        }

        toArray(e = [], t = 0) {
            return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
        }

        fromBufferAttribute(e, t) {
            return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this
        }

        toJSON() {
            return this.toArray()
        }

        _onChange(e) {
            return this._onChangeCallback = e, this
        }

        _onChangeCallback() {
        }

        * [Symbol.iterator]() {
            yield this._x, yield this._y, yield this._z, yield this._w
        }
    }

    class W {
        constructor(e = 0, t = 0, i = 0) {
            W.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = i
        }

        set(e, t, i) {
            return void 0 === i && (i = this.z), this.x = e, this.y = t, this.z = i, this
        }

        setScalar(e) {
            return this.x = e, this.y = e, this.z = e, this
        }

        setX(e) {
            return this.x = e, this
        }

        setY(e) {
            return this.y = e, this
        }

        setZ(e) {
            return this.z = e, this
        }

        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                default:
                    throw Error("index is out of range: " + e)
            }
            return this
        }

        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw Error("index is out of range: " + e)
            }
        }

        clone() {
            return new this.constructor(this.x, this.y, this.z)
        }

        copy(e) {
            return this.x = e.x, this.y = e.y, this.z = e.z, this
        }

        add(e) {
            return this.x += e.x, this.y += e.y, this.z += e.z, this
        }

        addScalar(e) {
            return this.x += e, this.y += e, this.z += e, this
        }

        addVectors(e, t) {
            return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
        }

        addScaledVector(e, t) {
            return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this
        }

        sub(e) {
            return this.x -= e.x, this.y -= e.y, this.z -= e.z, this
        }

        subScalar(e) {
            return this.x -= e, this.y -= e, this.z -= e, this
        }

        subVectors(e, t) {
            return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
        }

        multiply(e) {
            return this.x *= e.x, this.y *= e.y, this.z *= e.z, this
        }

        multiplyScalar(e) {
            return this.x *= e, this.y *= e, this.z *= e, this
        }

        multiplyVectors(e, t) {
            return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
        }

        applyEuler(e) {
            return this.applyQuaternion(q.setFromEuler(e))
        }

        applyAxisAngle(e, t) {
            return this.applyQuaternion(q.setFromAxisAngle(e, t))
        }

        applyMatrix3(e) {
            let t = this.x, i = this.y, r = this.z, a = e.elements;
            return this.x = a[0] * t + a[3] * i + a[6] * r, this.y = a[1] * t + a[4] * i + a[7] * r, this.z = a[2] * t + a[5] * i + a[8] * r, this
        }

        applyNormalMatrix(e) {
            return this.applyMatrix3(e).normalize()
        }

        applyMatrix4(e) {
            let t = this.x, i = this.y, r = this.z, a = e.elements, n = 1 / (a[3] * t + a[7] * i + a[11] * r + a[15]);
            return this.x = (a[0] * t + a[4] * i + a[8] * r + a[12]) * n, this.y = (a[1] * t + a[5] * i + a[9] * r + a[13]) * n, this.z = (a[2] * t + a[6] * i + a[10] * r + a[14]) * n, this
        }

        applyQuaternion(e) {
            let t = this.x, i = this.y, r = this.z, a = e.x, n = e.y, s = e.z, o = e.w, l = o * t + n * r - s * i,
                h = o * i + s * t - a * r, c = o * r + a * i - n * t, u = -a * t - n * i - s * r;
            return this.x = l * o + -(u * a) + -(h * s) - -(c * n), this.y = h * o + -(u * n) + -(c * a) - -(l * s), this.z = c * o + -(u * s) + -(l * n) - -(h * a), this
        }

        project(e) {
            return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
        }

        unproject(e) {
            return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
        }

        transformDirection(e) {
            let t = this.x, i = this.y, r = this.z, a = e.elements;
            return this.x = a[0] * t + a[4] * i + a[8] * r, this.y = a[1] * t + a[5] * i + a[9] * r, this.z = a[2] * t + a[6] * i + a[10] * r, this.normalize()
        }

        divide(e) {
            return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
        }

        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }

        min(e) {
            return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this
        }

        max(e) {
            return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this
        }

        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this
        }

        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this
        }

        clampLength(e, t) {
            let i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }

        floor() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
        }

        ceil() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
        }

        round() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
        }

        roundToZero() {
            return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this
        }

        negate() {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
        }

        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z
        }

        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }

        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        }

        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
        }

        normalize() {
            return this.divideScalar(this.length() || 1)
        }

        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }

        lerp(e, t) {
            return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
        }

        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this
        }

        cross(e) {
            return this.crossVectors(this, e)
        }

        crossVectors(e, t) {
            let i = e.x, r = e.y, a = e.z, n = t.x, s = t.y, o = t.z;
            return this.x = r * o - a * s, this.y = a * n - i * o, this.z = i * s - r * n, this
        }

        projectOnVector(e) {
            let t = e.lengthSq();
            if (0 === t) return this.set(0, 0, 0);
            let i = e.dot(this) / t;
            return this.copy(e).multiplyScalar(i)
        }

        projectOnPlane(e) {
            return j.copy(this).projectOnVector(e), this.sub(j)
        }

        reflect(e) {
            return this.sub(j.copy(e).multiplyScalar(2 * this.dot(e)))
        }

        angleTo(e) {
            let t = Math.sqrt(this.lengthSq() * e.lengthSq());
            if (0 === t) return Math.PI / 2;
            let i = this.dot(e) / t;
            return Math.acos(f(i, -1, 1))
        }

        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e))
        }

        distanceToSquared(e) {
            let t = this.x - e.x, i = this.y - e.y, r = this.z - e.z;
            return t * t + i * i + r * r
        }

        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
        }

        setFromSpherical(e) {
            return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
        }

        setFromSphericalCoords(e, t, i) {
            let r = Math.sin(t) * e;
            return this.x = r * Math.sin(i), this.y = Math.cos(t) * e, this.z = r * Math.cos(i), this
        }

        setFromCylindrical(e) {
            return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
        }

        setFromCylindricalCoords(e, t, i) {
            return this.x = e * Math.sin(t), this.y = i, this.z = e * Math.cos(t), this
        }

        setFromMatrixPosition(e) {
            let t = e.elements;
            return this.x = t[12], this.y = t[13], this.z = t[14], this
        }

        setFromMatrixScale(e) {
            let t = this.setFromMatrixColumn(e, 0).length(), i = this.setFromMatrixColumn(e, 1).length(),
                r = this.setFromMatrixColumn(e, 2).length();
            return this.x = t, this.y = i, this.z = r, this
        }

        setFromMatrixColumn(e, t) {
            return this.fromArray(e.elements, 4 * t)
        }

        setFromMatrix3Column(e, t) {
            return this.fromArray(e.elements, 3 * t)
        }

        setFromEuler(e) {
            return this.x = e._x, this.y = e._y, this.z = e._z, this
        }

        setFromColor(e) {
            return this.x = e.r, this.y = e.g, this.z = e.b, this
        }

        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z
        }

        fromArray(e, t = 0) {
            return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
        }

        toArray(e = [], t = 0) {
            return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
        }

        fromBufferAttribute(e, t) {
            return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this
        }

        random() {
            return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this
        }

        randomDirection() {
            let e = (Math.random() - .5) * 2, t = Math.random() * Math.PI * 2, i = Math.sqrt(1 - e ** 2);
            return this.x = i * Math.cos(t), this.y = i * Math.sin(t), this.z = e, this
        }

        * [Symbol.iterator]() {
            yield this.x, yield this.y, yield this.z
        }
    }

    let j = new W, q = new G;

    class X {
        constructor(e = new W(Infinity, Infinity, Infinity), t = new W(-1 / 0, -1 / 0, -1 / 0)) {
            this.isBox3 = !0, this.min = e, this.max = t
        }

        set(e, t) {
            return this.min.copy(e), this.max.copy(t), this
        }

        setFromArray(e) {
            this.makeEmpty();
            for (let t = 0, i = e.length; t < i; t += 3) this.expandByPoint(Z.fromArray(e, t));
            return this
        }

        setFromBufferAttribute(e) {
            this.makeEmpty();
            for (let t = 0, i = e.count; t < i; t++) this.expandByPoint(Z.fromBufferAttribute(e, t));
            return this
        }

        setFromPoints(e) {
            this.makeEmpty();
            for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
            return this
        }

        setFromCenterAndSize(e, t) {
            let i = Z.copy(t).multiplyScalar(.5);
            return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
        }

        setFromObject(e, t = !1) {
            return this.makeEmpty(), this.expandByObject(e, t)
        }

        clone() {
            return new this.constructor().copy(this)
        }

        copy(e) {
            return this.min.copy(e.min), this.max.copy(e.max), this
        }

        makeEmpty() {
            return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -1 / 0, this
        }

        isEmpty() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        }

        getCenter(e) {
            return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
        }

        getSize(e) {
            return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
        }

        expandByPoint(e) {
            return this.min.min(e), this.max.max(e), this
        }

        expandByVector(e) {
            return this.min.sub(e), this.max.add(e), this
        }

        expandByScalar(e) {
            return this.min.addScalar(-e), this.max.addScalar(e), this
        }

        expandByObject(e, t = !1) {
            if (e.updateWorldMatrix(!1, !1), void 0 !== e.boundingBox) null === e.boundingBox && e.computeBoundingBox(), K.copy(e.boundingBox), K.applyMatrix4(e.matrixWorld), this.union(K); else {
                let i = e.geometry;
                if (void 0 !== i) {
                    if (t && void 0 !== i.attributes && void 0 !== i.attributes.position) {
                        let t = i.attributes.position;
                        for (let i = 0, r = t.count; i < r; i++) Z.fromBufferAttribute(t, i).applyMatrix4(e.matrixWorld), this.expandByPoint(Z)
                    } else null === i.boundingBox && i.computeBoundingBox(), K.copy(i.boundingBox), K.applyMatrix4(e.matrixWorld), this.union(K)
                }
            }
            let i = e.children;
            for (let e = 0, r = i.length; e < r; e++) this.expandByObject(i[e], t);
            return this
        }

        containsPoint(e) {
            return !(e.x < this.min.x) && !(e.x > this.max.x) && !(e.y < this.min.y) && !(e.y > this.max.y) && !(e.z < this.min.z) && !(e.z > this.max.z)
        }

        containsBox(e) {
            return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
        }

        getParameter(e, t) {
            return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
        }

        intersectsBox(e) {
            return !(e.max.x < this.min.x) && !(e.min.x > this.max.x) && !(e.max.y < this.min.y) && !(e.min.y > this.max.y) && !(e.max.z < this.min.z) && !(e.min.z > this.max.z)
        }

        intersectsSphere(e) {
            return this.clampPoint(e.center, Z), Z.distanceToSquared(e.center) <= e.radius * e.radius
        }

        intersectsPlane(e) {
            let t, i;
            return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant
        }

        intersectsTriangle(e) {
            if (this.isEmpty()) return !1;
            this.getCenter(er), ea.subVectors(this.max, er), J.subVectors(e.a, er), Q.subVectors(e.b, er), $.subVectors(e.c, er), ee.subVectors(Q, J), et.subVectors($, Q), ei.subVectors(J, $);
            let t = [0, -ee.z, ee.y, 0, -et.z, et.y, 0, -ei.z, ei.y, ee.z, 0, -ee.x, et.z, 0, -et.x, ei.z, 0, -ei.x, -ee.y, ee.x, 0, -et.y, et.x, 0, -ei.y, ei.x, 0];
            return !!(eo(t, J, Q, $, ea) && eo(t = [1, 0, 0, 0, 1, 0, 0, 0, 1], J, Q, $, ea)) && (en.crossVectors(ee, et), eo(t = [en.x, en.y, en.z], J, Q, $, ea))
        }

        clampPoint(e, t) {
            return t.copy(e).clamp(this.min, this.max)
        }

        distanceToPoint(e) {
            return this.clampPoint(e, Z).distanceTo(e)
        }

        getBoundingSphere(e) {
            return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = .5 * this.getSize(Z).length()), e
        }

        intersect(e) {
            return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this
        }

        union(e) {
            return this.min.min(e.min), this.max.max(e.max), this
        }

        applyMatrix4(e) {
            return this.isEmpty() || (Y[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Y[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Y[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Y[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Y[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Y[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Y[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Y[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Y)), this
        }

        translate(e) {
            return this.min.add(e), this.max.add(e), this
        }

        equals(e) {
            return e.min.equals(this.min) && e.max.equals(this.max)
        }
    }

    let Y = [new W, new W, new W, new W, new W, new W, new W, new W], Z = new W, K = new X, J = new W, Q = new W,
        $ = new W, ee = new W, et = new W, ei = new W, er = new W, ea = new W, en = new W, es = new W;

    function eo(e, t, i, r, a) {
        for (let n = 0, s = e.length - 3; n <= s; n += 3) {
            es.fromArray(e, n);
            let s = a.x * Math.abs(es.x) + a.y * Math.abs(es.y) + a.z * Math.abs(es.z), o = t.dot(es), l = i.dot(es),
                h = r.dot(es);
            if (Math.max(-Math.max(o, l, h), Math.min(o, l, h)) > s) return !1
        }
        return !0
    }

    let el = new X, eh = new W, ec = new W;

    class eu {
        constructor(e = new W, t = -1) {
            this.center = e, this.radius = t
        }

        set(e, t) {
            return this.center.copy(e), this.radius = t, this
        }

        setFromPoints(e, t) {
            let i = this.center;
            void 0 !== t ? i.copy(t) : el.setFromPoints(e).getCenter(i);
            let r = 0;
            for (let t = 0, a = e.length; t < a; t++) r = Math.max(r, i.distanceToSquared(e[t]));
            return this.radius = Math.sqrt(r), this
        }

        copy(e) {
            return this.center.copy(e.center), this.radius = e.radius, this
        }

        isEmpty() {
            return this.radius < 0
        }

        makeEmpty() {
            return this.center.set(0, 0, 0), this.radius = -1, this
        }

        containsPoint(e) {
            return e.distanceToSquared(this.center) <= this.radius * this.radius
        }

        distanceToPoint(e) {
            return e.distanceTo(this.center) - this.radius
        }

        intersectsSphere(e) {
            let t = this.radius + e.radius;
            return e.center.distanceToSquared(this.center) <= t * t
        }

        intersectsBox(e) {
            return e.intersectsSphere(this)
        }

        intersectsPlane(e) {
            return Math.abs(e.distanceToPoint(this.center)) <= this.radius
        }

        clampPoint(e, t) {
            let i = this.center.distanceToSquared(e);
            return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t
        }

        getBoundingBox(e) {
            return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e)
        }

        applyMatrix4(e) {
            return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
        }

        translate(e) {
            return this.center.add(e), this
        }

        expandByPoint(e) {
            if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
            eh.subVectors(e, this.center);
            let t = eh.lengthSq();
            if (t > this.radius * this.radius) {
                let e = Math.sqrt(t), i = (e - this.radius) * .5;
                this.center.addScaledVector(eh, i / e), this.radius += i
            }
            return this
        }

        union(e) {
            return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (!0 === this.center.equals(e.center) ? this.radius = Math.max(this.radius, e.radius) : (ec.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(eh.copy(e.center).add(ec)), this.expandByPoint(eh.copy(e.center).sub(ec))), this)
        }

        equals(e) {
            return e.center.equals(this.center) && e.radius === this.radius
        }

        clone() {
            return new this.constructor().copy(this)
        }
    }

    let ed = new W, ep = new W, ef = new W, em = new W, eg = new W, ev = new W, e_ = new W;

    class ex {
        constructor(e = new W, t = new W(0, 0, -1)) {
            this.origin = e, this.direction = t
        }

        set(e, t) {
            return this.origin.copy(e), this.direction.copy(t), this
        }

        copy(e) {
            return this.origin.copy(e.origin), this.direction.copy(e.direction), this
        }

        at(e, t) {
            return t.copy(this.origin).addScaledVector(this.direction, e)
        }

        lookAt(e) {
            return this.direction.copy(e).sub(this.origin).normalize(), this
        }

        recast(e) {
            return this.origin.copy(this.at(e, ed)), this
        }

        closestPointToPoint(e, t) {
            t.subVectors(e, this.origin);
            let i = t.dot(this.direction);
            return i < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, i)
        }

        distanceToPoint(e) {
            return Math.sqrt(this.distanceSqToPoint(e))
        }

        distanceSqToPoint(e) {
            let t = ed.subVectors(e, this.origin).dot(this.direction);
            return t < 0 ? this.origin.distanceToSquared(e) : (ed.copy(this.origin).addScaledVector(this.direction, t), ed.distanceToSquared(e))
        }

        distanceSqToSegment(e, t, i, r) {
            let a, n, s, o;
            ep.copy(e).add(t).multiplyScalar(.5), ef.copy(t).sub(e).normalize(), em.copy(this.origin).sub(ep);
            let l = .5 * e.distanceTo(t), h = -this.direction.dot(ef), c = em.dot(this.direction), u = -em.dot(ef),
                d = em.lengthSq(), p = Math.abs(1 - h * h);
            if (p > 0) {
                if (a = h * u - c, n = h * c - u, o = l * p, a >= 0) {
                    if (n >= -o) {
                        if (n <= o) {
                            let e = 1 / p;
                            a *= e, n *= e, s = a * (a + h * n + 2 * c) + n * (h * a + n + 2 * u) + d
                        } else s = -(a = Math.max(0, -(h * (n = l) + c))) * a + n * (n + 2 * u) + d
                    } else s = -(a = Math.max(0, -(h * (n = -l) + c))) * a + n * (n + 2 * u) + d
                } else n <= -o ? (n = (a = Math.max(0, -(-h * l + c))) > 0 ? -l : Math.min(Math.max(-l, -u), l), s = -a * a + n * (n + 2 * u) + d) : n <= o ? (a = 0, s = (n = Math.min(Math.max(-l, -u), l)) * (n + 2 * u) + d) : (n = (a = Math.max(0, -(h * l + c))) > 0 ? l : Math.min(Math.max(-l, -u), l), s = -a * a + n * (n + 2 * u) + d)
            } else n = h > 0 ? -l : l, s = -(a = Math.max(0, -(h * n + c))) * a + n * (n + 2 * u) + d;
            return i && i.copy(this.origin).addScaledVector(this.direction, a), r && r.copy(ep).addScaledVector(ef, n), s
        }

        intersectSphere(e, t) {
            ed.subVectors(e.center, this.origin);
            let i = ed.dot(this.direction), r = ed.dot(ed) - i * i, a = e.radius * e.radius;
            if (r > a) return null;
            let n = Math.sqrt(a - r), s = i - n, o = i + n;
            return o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t)
        }

        intersectsSphere(e) {
            return this.distanceSqToPoint(e.center) <= e.radius * e.radius
        }

        distanceToPlane(e) {
            let t = e.normal.dot(this.direction);
            if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
            let i = -(this.origin.dot(e.normal) + e.constant) / t;
            return i >= 0 ? i : null
        }

        intersectPlane(e, t) {
            let i = this.distanceToPlane(e);
            return null === i ? null : this.at(i, t)
        }

        intersectsPlane(e) {
            let t = e.distanceToPoint(this.origin);
            if (0 === t) return !0;
            let i = e.normal.dot(this.direction);
            return i * t < 0
        }

        intersectBox(e, t) {
            let i, r, a, n, s, o;
            let l = 1 / this.direction.x, h = 1 / this.direction.y, c = 1 / this.direction.z, u = this.origin;
            return (l >= 0 ? (i = (e.min.x - u.x) * l, r = (e.max.x - u.x) * l) : (i = (e.max.x - u.x) * l, r = (e.min.x - u.x) * l), h >= 0 ? (a = (e.min.y - u.y) * h, n = (e.max.y - u.y) * h) : (a = (e.max.y - u.y) * h, n = (e.min.y - u.y) * h), i > n || a > r) ? null : ((a > i || isNaN(i)) && (i = a), (n < r || isNaN(r)) && (r = n), c >= 0 ? (s = (e.min.z - u.z) * c, o = (e.max.z - u.z) * c) : (s = (e.max.z - u.z) * c, o = (e.min.z - u.z) * c), i > o || s > r) ? null : ((s > i || i != i) && (i = s), (o < r || r != r) && (r = o), r < 0) ? null : this.at(i >= 0 ? i : r, t)
        }

        intersectsBox(e) {
            return null !== this.intersectBox(e, ed)
        }

        intersectTriangle(e, t, i, r, a) {
            let n;
            eg.subVectors(t, e), ev.subVectors(i, e), e_.crossVectors(eg, ev);
            let s = this.direction.dot(e_);
            if (s > 0) {
                if (r) return null;
                n = 1
            } else {
                if (!(s < 0)) return null;
                n = -1, s = -s
            }
            em.subVectors(this.origin, e);
            let o = n * this.direction.dot(ev.crossVectors(em, ev));
            if (o < 0) return null;
            let l = n * this.direction.dot(eg.cross(em));
            if (l < 0 || o + l > s) return null;
            let h = -n * em.dot(e_);
            return h < 0 ? null : this.at(h / s, a)
        }

        applyMatrix4(e) {
            return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this
        }

        equals(e) {
            return e.origin.equals(this.origin) && e.direction.equals(this.direction)
        }

        clone() {
            return new this.constructor().copy(this)
        }
    }

    class ey {
        constructor(e, t, i, r, a, n, s, o, l, h, c, u, d, p, f, m) {
            ey.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], void 0 !== e && this.set(e, t, i, r, a, n, s, o, l, h, c, u, d, p, f, m)
        }

        set(e, t, i, r, a, n, s, o, l, h, c, u, d, p, f, m) {
            let g = this.elements;
            return g[0] = e, g[4] = t, g[8] = i, g[12] = r, g[1] = a, g[5] = n, g[9] = s, g[13] = o, g[2] = l, g[6] = h, g[10] = c, g[14] = u, g[3] = d, g[7] = p, g[11] = f, g[15] = m, this
        }

        identity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
        }

        clone() {
            return new ey().fromArray(this.elements)
        }

        copy(e) {
            let t = this.elements, i = e.elements;
            return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15], this
        }

        copyPosition(e) {
            let t = this.elements, i = e.elements;
            return t[12] = i[12], t[13] = i[13], t[14] = i[14], this
        }

        setFromMatrix3(e) {
            let t = e.elements;
            return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this
        }

        extractBasis(e, t, i) {
            return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this
        }

        makeBasis(e, t, i) {
            return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1), this
        }

        extractRotation(e) {
            let t = this.elements, i = e.elements, r = 1 / eM.setFromMatrixColumn(e, 0).length(),
                a = 1 / eM.setFromMatrixColumn(e, 1).length(), n = 1 / eM.setFromMatrixColumn(e, 2).length();
            return t[0] = i[0] * r, t[1] = i[1] * r, t[2] = i[2] * r, t[3] = 0, t[4] = i[4] * a, t[5] = i[5] * a, t[6] = i[6] * a, t[7] = 0, t[8] = i[8] * n, t[9] = i[9] * n, t[10] = i[10] * n, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
        }

        makeRotationFromEuler(e) {
            let t = this.elements, i = e.x, r = e.y, a = e.z, n = Math.cos(i), s = Math.sin(i), o = Math.cos(r),
                l = Math.sin(r), h = Math.cos(a), c = Math.sin(a);
            if ("XYZ" === e.order) {
                let e = n * h, i = n * c, r = s * h, a = s * c;
                t[0] = o * h, t[4] = -o * c, t[8] = l, t[1] = i + r * l, t[5] = e - a * l, t[9] = -s * o, t[2] = a - e * l, t[6] = r + i * l, t[10] = n * o
            } else if ("YXZ" === e.order) {
                let e = o * h, i = o * c, r = l * h, a = l * c;
                t[0] = e + a * s, t[4] = r * s - i, t[8] = n * l, t[1] = n * c, t[5] = n * h, t[9] = -s, t[2] = i * s - r, t[6] = a + e * s, t[10] = n * o
            } else if ("ZXY" === e.order) {
                let e = o * h, i = o * c, r = l * h, a = l * c;
                t[0] = e - a * s, t[4] = -n * c, t[8] = r + i * s, t[1] = i + r * s, t[5] = n * h, t[9] = a - e * s, t[2] = -n * l, t[6] = s, t[10] = n * o
            } else if ("ZYX" === e.order) {
                let e = n * h, i = n * c, r = s * h, a = s * c;
                t[0] = o * h, t[4] = r * l - i, t[8] = e * l + a, t[1] = o * c, t[5] = a * l + e, t[9] = i * l - r, t[2] = -l, t[6] = s * o, t[10] = n * o
            } else if ("YZX" === e.order) {
                let e = n * o, i = n * l, r = s * o, a = s * l;
                t[0] = o * h, t[4] = a - e * c, t[8] = r * c + i, t[1] = c, t[5] = n * h, t[9] = -s * h, t[2] = -l * h, t[6] = i * c + r, t[10] = e - a * c
            } else if ("XZY" === e.order) {
                let e = n * o, i = n * l, r = s * o, a = s * l;
                t[0] = o * h, t[4] = -c, t[8] = l * h, t[1] = e * c + a, t[5] = n * h, t[9] = i * c - r, t[2] = r * c - i, t[6] = s * h, t[10] = a * c + e
            }
            return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
        }

        makeRotationFromQuaternion(e) {
            return this.compose(eb, e, ew)
        }

        lookAt(e, t, i) {
            let r = this.elements;
            return eA.subVectors(e, t), 0 === eA.lengthSq() && (eA.z = 1), eA.normalize(), eT.crossVectors(i, eA), 0 === eT.lengthSq() && (1 === Math.abs(i.z) ? eA.x += 1e-4 : eA.z += 1e-4, eA.normalize(), eT.crossVectors(i, eA)), eT.normalize(), eE.crossVectors(eA, eT), r[0] = eT.x, r[4] = eE.x, r[8] = eA.x, r[1] = eT.y, r[5] = eE.y, r[9] = eA.y, r[2] = eT.z, r[6] = eE.z, r[10] = eA.z, this
        }

        multiply(e) {
            return this.multiplyMatrices(this, e)
        }

        premultiply(e) {
            return this.multiplyMatrices(e, this)
        }

        multiplyMatrices(e, t) {
            let i = e.elements, r = t.elements, a = this.elements, n = i[0], s = i[4], o = i[8], l = i[12], h = i[1],
                c = i[5], u = i[9], d = i[13], p = i[2], f = i[6], m = i[10], g = i[14], v = i[3], _ = i[7], x = i[11],
                y = i[15], M = r[0], S = r[4], b = r[8], w = r[12], T = r[1], E = r[5], A = r[9], C = r[13], L = r[2],
                P = r[6], R = r[10], D = r[14], U = r[3], I = r[7], N = r[11], O = r[15];
            return a[0] = n * M + s * T + o * L + l * U, a[4] = n * S + s * E + o * P + l * I, a[8] = n * b + s * A + o * R + l * N, a[12] = n * w + s * C + o * D + l * O, a[1] = h * M + c * T + u * L + d * U, a[5] = h * S + c * E + u * P + d * I, a[9] = h * b + c * A + u * R + d * N, a[13] = h * w + c * C + u * D + d * O, a[2] = p * M + f * T + m * L + g * U, a[6] = p * S + f * E + m * P + g * I, a[10] = p * b + f * A + m * R + g * N, a[14] = p * w + f * C + m * D + g * O, a[3] = v * M + _ * T + x * L + y * U, a[7] = v * S + _ * E + x * P + y * I, a[11] = v * b + _ * A + x * R + y * N, a[15] = v * w + _ * C + x * D + y * O, this
        }

        multiplyScalar(e) {
            let t = this.elements;
            return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
        }

        determinant() {
            let e = this.elements, t = e[0], i = e[4], r = e[8], a = e[12], n = e[1], s = e[5], o = e[9], l = e[13],
                h = e[2], c = e[6], u = e[10], d = e[14], p = e[3], f = e[7], m = e[11], g = e[15];
            return p * (+a * o * c - r * l * c - a * s * u + i * l * u + r * s * d - i * o * d) + f * (+t * o * d - t * l * u + a * n * u - r * n * d + r * l * h - a * o * h) + m * (+t * l * c - t * s * d - a * n * c + i * n * d + a * s * h - i * l * h) + g * (-r * s * h - t * o * c + t * s * u + r * n * c - i * n * u + i * o * h)
        }

        transpose() {
            let e;
            let t = this.elements;
            return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
        }

        setPosition(e, t, i) {
            let r = this.elements;
            return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = i), this
        }

        invert() {
            let e = this.elements, t = e[0], i = e[1], r = e[2], a = e[3], n = e[4], s = e[5], o = e[6], l = e[7],
                h = e[8], c = e[9], u = e[10], d = e[11], p = e[12], f = e[13], m = e[14], g = e[15],
                v = c * m * l - f * u * l + f * o * d - s * m * d - c * o * g + s * u * g,
                _ = p * u * l - h * m * l - p * o * d + n * m * d + h * o * g - n * u * g,
                x = h * f * l - p * c * l + p * s * d - n * f * d - h * s * g + n * c * g,
                y = p * c * o - h * f * o - p * s * u + n * f * u + h * s * m - n * c * m,
                M = t * v + i * _ + r * x + a * y;
            if (0 === M) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            let S = 1 / M;
            return e[0] = v * S, e[1] = (f * u * a - c * m * a - f * r * d + i * m * d + c * r * g - i * u * g) * S, e[2] = (s * m * a - f * o * a + f * r * l - i * m * l - s * r * g + i * o * g) * S, e[3] = (c * o * a - s * u * a - c * r * l + i * u * l + s * r * d - i * o * d) * S, e[4] = _ * S, e[5] = (h * m * a - p * u * a + p * r * d - t * m * d - h * r * g + t * u * g) * S, e[6] = (p * o * a - n * m * a - p * r * l + t * m * l + n * r * g - t * o * g) * S, e[7] = (n * u * a - h * o * a + h * r * l - t * u * l - n * r * d + t * o * d) * S, e[8] = x * S, e[9] = (p * c * a - h * f * a - p * i * d + t * f * d + h * i * g - t * c * g) * S, e[10] = (n * f * a - p * s * a + p * i * l - t * f * l - n * i * g + t * s * g) * S, e[11] = (h * s * a - n * c * a - h * i * l + t * c * l + n * i * d - t * s * d) * S, e[12] = y * S, e[13] = (h * f * r - p * c * r + p * i * u - t * f * u - h * i * m + t * c * m) * S, e[14] = (p * s * r - n * f * r - p * i * o + t * f * o + n * i * m - t * s * m) * S, e[15] = (n * c * r - h * s * r + h * i * o - t * c * o - n * i * u + t * s * u) * S, this
        }

        scale(e) {
            let t = this.elements, i = e.x, r = e.y, a = e.z;
            return t[0] *= i, t[4] *= r, t[8] *= a, t[1] *= i, t[5] *= r, t[9] *= a, t[2] *= i, t[6] *= r, t[10] *= a, t[3] *= i, t[7] *= r, t[11] *= a, this
        }

        getMaxScaleOnAxis() {
            let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
            return Math.sqrt(Math.max(t, i, r))
        }

        makeTranslation(e, t, i) {
            return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
        }

        makeRotationX(e) {
            let t = Math.cos(e), i = Math.sin(e);
            return this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1), this
        }

        makeRotationY(e) {
            let t = Math.cos(e), i = Math.sin(e);
            return this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1), this
        }

        makeRotationZ(e) {
            let t = Math.cos(e), i = Math.sin(e);
            return this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
        }

        makeRotationAxis(e, t) {
            let i = Math.cos(t), r = Math.sin(t), a = 1 - i, n = e.x, s = e.y, o = e.z, l = a * n, h = a * s;
            return this.set(l * n + i, l * s - r * o, l * o + r * s, 0, l * s + r * o, h * s + i, h * o - r * n, 0, l * o - r * s, h * o + r * n, a * o * o + i, 0, 0, 0, 0, 1), this
        }

        makeScale(e, t, i) {
            return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
        }

        makeShear(e, t, i, r, a, n) {
            return this.set(1, i, a, 0, e, 1, n, 0, t, r, 1, 0, 0, 0, 0, 1), this
        }

        compose(e, t, i) {
            let r = this.elements, a = t._x, n = t._y, s = t._z, o = t._w, l = a + a, h = n + n, c = s + s, u = a * l,
                d = a * h, p = a * c, f = n * h, m = n * c, g = s * c, v = o * l, _ = o * h, x = o * c, y = i.x,
                M = i.y, S = i.z;
            return r[0] = (1 - (f + g)) * y, r[1] = (d + x) * y, r[2] = (p - _) * y, r[3] = 0, r[4] = (d - x) * M, r[5] = (1 - (u + g)) * M, r[6] = (m + v) * M, r[7] = 0, r[8] = (p + _) * S, r[9] = (m - v) * S, r[10] = (1 - (u + f)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this
        }

        decompose(e, t, i) {
            let r = this.elements, a = eM.set(r[0], r[1], r[2]).length(), n = eM.set(r[4], r[5], r[6]).length(),
                s = eM.set(r[8], r[9], r[10]).length(), o = this.determinant();
            o < 0 && (a = -a), e.x = r[12], e.y = r[13], e.z = r[14], eS.copy(this);
            let l = 1 / a, h = 1 / n, c = 1 / s;
            return eS.elements[0] *= l, eS.elements[1] *= l, eS.elements[2] *= l, eS.elements[4] *= h, eS.elements[5] *= h, eS.elements[6] *= h, eS.elements[8] *= c, eS.elements[9] *= c, eS.elements[10] *= c, t.setFromRotationMatrix(eS), i.x = a, i.y = n, i.z = s, this
        }

        makePerspective(e, t, i, r, a, n, s = 2e3) {
            let o, l;
            let h = this.elements;
            if (2e3 === s) o = -(n + a) / (n - a), l = -2 * n * a / (n - a); else if (2001 === s) o = -n / (n - a), l = -n * a / (n - a); else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
            return h[0] = 2 * a / (t - e), h[4] = 0, h[8] = (t + e) / (t - e), h[12] = 0, h[1] = 0, h[5] = 2 * a / (i - r), h[9] = (i + r) / (i - r), h[13] = 0, h[2] = 0, h[6] = 0, h[10] = o, h[14] = l, h[3] = 0, h[7] = 0, h[11] = -1, h[15] = 0, this
        }

        makeOrthographic(e, t, i, r, a, n, s = 2e3) {
            let o, l;
            let h = this.elements, c = 1 / (t - e), u = 1 / (i - r), d = 1 / (n - a);
            if (2e3 === s) o = (n + a) * d, l = -2 * d; else if (2001 === s) o = a * d, l = -1 * d; else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
            return h[0] = 2 * c, h[4] = 0, h[8] = 0, h[12] = -((t + e) * c), h[1] = 0, h[5] = 2 * u, h[9] = 0, h[13] = -((i + r) * u), h[2] = 0, h[6] = 0, h[10] = l, h[14] = -o, h[3] = 0, h[7] = 0, h[11] = 0, h[15] = 1, this
        }

        equals(e) {
            let t = this.elements, i = e.elements;
            for (let e = 0; e < 16; e++) if (t[e] !== i[e]) return !1;
            return !0
        }

        fromArray(e, t = 0) {
            for (let i = 0; i < 16; i++) this.elements[i] = e[i + t];
            return this
        }

        toArray(e = [], t = 0) {
            let i = this.elements;
            return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e
        }
    }

    let eM = new W, eS = new ey, eb = new W(0, 0, 0), ew = new W(1, 1, 1), eT = new W, eE = new W, eA = new W,
        eC = new ey, eL = new G;

    class eP {
        constructor(e = 0, t = 0, i = 0, r = eP.DEFAULT_ORDER) {
            this.isEuler = !0, this._x = e, this._y = t, this._z = i, this._order = r
        }

        get x() {
            return this._x
        }

        set x(e) {
            this._x = e, this._onChangeCallback()
        }

        get y() {
            return this._y
        }

        set y(e) {
            this._y = e, this._onChangeCallback()
        }

        get z() {
            return this._z
        }

        set z(e) {
            this._z = e, this._onChangeCallback()
        }

        get order() {
            return this._order
        }

        set order(e) {
            this._order = e, this._onChangeCallback()
        }

        set(e, t, i, r = this._order) {
            return this._x = e, this._y = t, this._z = i, this._order = r, this._onChangeCallback(), this
        }

        clone() {
            return new this.constructor(this._x, this._y, this._z, this._order)
        }

        copy(e) {
            return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this
        }

        setFromRotationMatrix(e, t = this._order, i = !0) {
            let r = e.elements, a = r[0], n = r[4], s = r[8], o = r[1], l = r[5], h = r[9], c = r[2], u = r[6],
                d = r[10];
            switch (t) {
                case"XYZ":
                    this._y = Math.asin(f(s, -1, 1)), .9999999 > Math.abs(s) ? (this._x = Math.atan2(-h, d), this._z = Math.atan2(-n, a)) : (this._x = Math.atan2(u, l), this._z = 0);
                    break;
                case"YXZ":
                    this._x = Math.asin(-f(h, -1, 1)), .9999999 > Math.abs(h) ? (this._y = Math.atan2(s, d), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-c, a), this._z = 0);
                    break;
                case"ZXY":
                    this._x = Math.asin(f(u, -1, 1)), .9999999 > Math.abs(u) ? (this._y = Math.atan2(-c, d), this._z = Math.atan2(-n, l)) : (this._y = 0, this._z = Math.atan2(o, a));
                    break;
                case"ZYX":
                    this._y = Math.asin(-f(c, -1, 1)), .9999999 > Math.abs(c) ? (this._x = Math.atan2(u, d), this._z = Math.atan2(o, a)) : (this._x = 0, this._z = Math.atan2(-n, l));
                    break;
                case"YZX":
                    this._z = Math.asin(f(o, -1, 1)), .9999999 > Math.abs(o) ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-c, a)) : (this._x = 0, this._y = Math.atan2(s, d));
                    break;
                case"XZY":
                    this._z = Math.asin(-f(n, -1, 1)), .9999999 > Math.abs(n) ? (this._x = Math.atan2(u, l), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-h, d), this._y = 0);
                    break;
                default:
                    console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
            }
            return this._order = t, !0 === i && this._onChangeCallback(), this
        }

        setFromQuaternion(e, t, i) {
            return eC.makeRotationFromQuaternion(e), this.setFromRotationMatrix(eC, t, i)
        }

        setFromVector3(e, t = this._order) {
            return this.set(e.x, e.y, e.z, t)
        }

        reorder(e) {
            return eL.setFromEuler(this), this.setFromQuaternion(eL, e)
        }

        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
        }

        fromArray(e) {
            return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this
        }

        toArray(e = [], t = 0) {
            return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
        }

        _onChange(e) {
            return this._onChangeCallback = e, this
        }

        _onChangeCallback() {
        }

        * [Symbol.iterator]() {
            yield this._x, yield this._y, yield this._z, yield this._order
        }
    }

    eP.DEFAULT_ORDER = "XYZ";

    class eR {
        constructor() {
            this.mask = 1
        }

        set(e) {
            this.mask = (1 << e | 0) >>> 0
        }

        enable(e) {
            this.mask |= 1 << e | 0
        }

        enableAll() {
            this.mask = -1
        }

        toggle(e) {
            this.mask ^= 1 << e | 0
        }

        disable(e) {
            this.mask &= ~(1 << e | 0)
        }

        disableAll() {
            this.mask = 0
        }

        test(e) {
            return (this.mask & e.mask) != 0
        }

        isEnabled(e) {
            return (this.mask & (1 << e | 0)) != 0
        }
    }

    let eD = 0, eU = new W, eI = new G, eN = new ey, eO = new W, ez = new W, eF = new W, eB = new G,
        ek = new W(1, 0, 0), eH = new W(0, 1, 0), eV = new W(0, 0, 1), eG = {type: "added"}, eW = {type: "removed"};

    class ej extends h {
        constructor() {
            super(), this.isObject3D = !0, Object.defineProperty(this, "id", {value: eD++}), this.uuid = p(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ej.DEFAULT_UP.clone();
            let e = new W, t = new eP, i = new G, r = new W(1, 1, 1);
            t._onChange(function () {
                i.setFromEuler(t, !1)
            }), i._onChange(function () {
                t.setFromQuaternion(i, void 0, !1)
            }), Object.defineProperties(this, {
                position: {configurable: !0, enumerable: !0, value: e},
                rotation: {configurable: !0, enumerable: !0, value: t},
                quaternion: {configurable: !0, enumerable: !0, value: i},
                scale: {configurable: !0, enumerable: !0, value: r},
                modelViewMatrix: {value: new ey},
                normalMatrix: {value: new y}
            }), this.matrix = new ey, this.matrixWorld = new ey, this.matrixAutoUpdate = ej.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = ej.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new eR, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {}
        }

        onBeforeRender() {
        }

        onAfterRender() {
        }

        applyMatrix4(e) {
            this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale)
        }

        applyQuaternion(e) {
            return this.quaternion.premultiply(e), this
        }

        setRotationFromAxisAngle(e, t) {
            this.quaternion.setFromAxisAngle(e, t)
        }

        setRotationFromEuler(e) {
            this.quaternion.setFromEuler(e, !0)
        }

        setRotationFromMatrix(e) {
            this.quaternion.setFromRotationMatrix(e)
        }

        setRotationFromQuaternion(e) {
            this.quaternion.copy(e)
        }

        rotateOnAxis(e, t) {
            return eI.setFromAxisAngle(e, t), this.quaternion.multiply(eI), this
        }

        rotateOnWorldAxis(e, t) {
            return eI.setFromAxisAngle(e, t), this.quaternion.premultiply(eI), this
        }

        rotateX(e) {
            return this.rotateOnAxis(ek, e)
        }

        rotateY(e) {
            return this.rotateOnAxis(eH, e)
        }

        rotateZ(e) {
            return this.rotateOnAxis(eV, e)
        }

        translateOnAxis(e, t) {
            return eU.copy(e).applyQuaternion(this.quaternion), this.position.add(eU.multiplyScalar(t)), this
        }

        translateX(e) {
            return this.translateOnAxis(ek, e)
        }

        translateY(e) {
            return this.translateOnAxis(eH, e)
        }

        translateZ(e) {
            return this.translateOnAxis(eV, e)
        }

        localToWorld(e) {
            return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld)
        }

        worldToLocal(e) {
            return this.updateWorldMatrix(!0, !1), e.applyMatrix4(eN.copy(this.matrixWorld).invert())
        }

        lookAt(e, t, i) {
            e.isVector3 ? eO.copy(e) : eO.set(e, t, i);
            let r = this.parent;
            this.updateWorldMatrix(!0, !1), ez.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? eN.lookAt(ez, eO, this.up) : eN.lookAt(eO, ez, this.up), this.quaternion.setFromRotationMatrix(eN), r && (eN.extractRotation(r.matrixWorld), eI.setFromRotationMatrix(eN), this.quaternion.premultiply(eI.invert()))
        }

        add(e) {
            if (arguments.length > 1) {
                for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
                return this
            }
            return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(eG)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
        }

        remove(e) {
            if (arguments.length > 1) {
                for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                return this
            }
            let t = this.children.indexOf(e);
            return -1 !== t && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(eW)), this
        }

        removeFromParent() {
            let e = this.parent;
            return null !== e && e.remove(this), this
        }

        clear() {
            return this.remove(...this.children)
        }

        attach(e) {
            return this.updateWorldMatrix(!0, !1), eN.copy(this.matrixWorld).invert(), null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), eN.multiply(e.parent.matrixWorld)), e.applyMatrix4(eN), this.add(e), e.updateWorldMatrix(!1, !0), this
        }

        getObjectById(e) {
            return this.getObjectByProperty("id", e)
        }

        getObjectByName(e) {
            return this.getObjectByProperty("name", e)
        }

        getObjectByProperty(e, t) {
            if (this[e] === t) return this;
            for (let i = 0, r = this.children.length; i < r; i++) {
                let r = this.children[i], a = r.getObjectByProperty(e, t);
                if (void 0 !== a) return a
            }
        }

        getObjectsByProperty(e, t) {
            let i = [];
            this[e] === t && i.push(this);
            for (let r = 0, a = this.children.length; r < a; r++) {
                let a = this.children[r].getObjectsByProperty(e, t);
                a.length > 0 && (i = i.concat(a))
            }
            return i
        }

        getWorldPosition(e) {
            return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld)
        }

        getWorldQuaternion(e) {
            return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ez, e, eF), e
        }

        getWorldScale(e) {
            return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ez, eB, e), e
        }

        getWorldDirection(e) {
            this.updateWorldMatrix(!0, !1);
            let t = this.matrixWorld.elements;
            return e.set(t[8], t[9], t[10]).normalize()
        }

        raycast() {
        }

        traverse(e) {
            e(this);
            let t = this.children;
            for (let i = 0, r = t.length; i < r; i++) t[i].traverse(e)
        }

        traverseVisible(e) {
            if (!1 === this.visible) return;
            e(this);
            let t = this.children;
            for (let i = 0, r = t.length; i < r; i++) t[i].traverseVisible(e)
        }

        traverseAncestors(e) {
            let t = this.parent;
            null !== t && (e(t), t.traverseAncestors(e))
        }

        updateMatrix() {
            this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
        }

        updateMatrixWorld(e) {
            this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
            let t = this.children;
            for (let i = 0, r = t.length; i < r; i++) {
                let r = t[i];
                (!0 === r.matrixWorldAutoUpdate || !0 === e) && r.updateMatrixWorld(e)
            }
        }

        updateWorldMatrix(e, t) {
            let i = this.parent;
            if (!0 === e && null !== i && !0 === i.matrixWorldAutoUpdate && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === t) {
                let e = this.children;
                for (let t = 0, i = e.length; t < i; t++) {
                    let i = e[t];
                    !0 === i.matrixWorldAutoUpdate && i.updateWorldMatrix(!1, !0)
                }
            }
        }

        toJSON(e) {
            let t = void 0 === e || "string" == typeof e, i = {};
            t && (e = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {}
            }, i.metadata = {version: 4.6, type: "Object", generator: "Object3D.toJSON"});
            let r = {};

            function a(t, i) {
                return void 0 === t[i.uuid] && (t[i.uuid] = i.toJSON(e)), i.uuid
            }

            if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), !0 === this.castShadow && (r.castShadow = !0), !0 === this.receiveShadow && (r.receiveShadow = !0), !1 === this.visible && (r.visible = !1), !1 === this.frustumCulled && (r.frustumCulled = !1), 0 !== this.renderOrder && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), !1 === this.matrixAutoUpdate && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (r.instanceColor = this.instanceColor.toJSON())), this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && !0 !== this.environment.isRenderTargetTexture && (r.environment = this.environment.toJSON(e).uuid); else if (this.isMesh || this.isLine || this.isPoints) {
                r.geometry = a(e.geometries, this.geometry);
                let t = this.geometry.parameters;
                if (void 0 !== t && void 0 !== t.shapes) {
                    let i = t.shapes;
                    if (Array.isArray(i)) for (let t = 0, r = i.length; t < r; t++) {
                        let r = i[t];
                        a(e.shapes, r)
                    } else a(e.shapes, i)
                }
            }
            if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (a(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), void 0 !== this.material) {
                if (Array.isArray(this.material)) {
                    let t = [];
                    for (let i = 0, r = this.material.length; i < r; i++) t.push(a(e.materials, this.material[i]));
                    r.material = t
                } else r.material = a(e.materials, this.material)
            }
            if (this.children.length > 0) {
                r.children = [];
                for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object)
            }
            if (this.animations.length > 0) {
                r.animations = [];
                for (let t = 0; t < this.animations.length; t++) {
                    let i = this.animations[t];
                    r.animations.push(a(e.animations, i))
                }
            }
            if (t) {
                let t = n(e.geometries), r = n(e.materials), a = n(e.textures), s = n(e.images), o = n(e.shapes),
                    l = n(e.skeletons), h = n(e.animations), c = n(e.nodes);
                t.length > 0 && (i.geometries = t), r.length > 0 && (i.materials = r), a.length > 0 && (i.textures = a), s.length > 0 && (i.images = s), o.length > 0 && (i.shapes = o), l.length > 0 && (i.skeletons = l), h.length > 0 && (i.animations = h), c.length > 0 && (i.nodes = c)
            }
            return i.object = r, i;

            function n(e) {
                let t = [];
                for (let i in e) {
                    let r = e[i];
                    delete r.metadata, t.push(r)
                }
                return t
            }
        }

        clone(e) {
            return new this.constructor().copy(this, e)
        }

        copy(e, t = !0) {
            if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), !0 === t) for (let t = 0; t < e.children.length; t++) {
                let i = e.children[t];
                this.add(i.clone())
            }
            return this
        }
    }

    ej.DEFAULT_UP = new W(0, 1, 0), ej.DEFAULT_MATRIX_AUTO_UPDATE = !0, ej.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
    let eq = new W, eX = new W, eY = new W, eZ = new W, eK = new W, eJ = new W, eQ = new W, e$ = new W, e0 = new W,
        e1 = new W, e3 = !1;

    class e2 {
        constructor(e = new W, t = new W, i = new W) {
            this.a = e, this.b = t, this.c = i
        }

        static getNormal(e, t, i, r) {
            r.subVectors(i, t), eq.subVectors(e, t), r.cross(eq);
            let a = r.lengthSq();
            return a > 0 ? r.multiplyScalar(1 / Math.sqrt(a)) : r.set(0, 0, 0)
        }

        static getBarycoord(e, t, i, r, a) {
            eq.subVectors(r, t), eX.subVectors(i, t), eY.subVectors(e, t);
            let n = eq.dot(eq), s = eq.dot(eX), o = eq.dot(eY), l = eX.dot(eX), h = eX.dot(eY), c = n * l - s * s;
            if (0 === c) return a.set(-2, -1, -1);
            let u = 1 / c, d = (l * o - s * h) * u, p = (n * h - s * o) * u;
            return a.set(1 - d - p, p, d)
        }

        static containsPoint(e, t, i, r) {
            return this.getBarycoord(e, t, i, r, eZ), eZ.x >= 0 && eZ.y >= 0 && eZ.x + eZ.y <= 1
        }

        static getUV(e, t, i, r, a, n, s, o) {
            return !1 === e3 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), e3 = !0), this.getInterpolation(e, t, i, r, a, n, s, o)
        }

        static getInterpolation(e, t, i, r, a, n, s, o) {
            return this.getBarycoord(e, t, i, r, eZ), o.setScalar(0), o.addScaledVector(a, eZ.x), o.addScaledVector(n, eZ.y), o.addScaledVector(s, eZ.z), o
        }

        static isFrontFacing(e, t, i, r) {
            return eq.subVectors(i, t), eX.subVectors(e, t), 0 > eq.cross(eX).dot(r)
        }

        set(e, t, i) {
            return this.a.copy(e), this.b.copy(t), this.c.copy(i), this
        }

        setFromPointsAndIndices(e, t, i, r) {
            return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this
        }

        setFromAttributeAndIndices(e, t, i, r) {
            return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, r), this
        }

        clone() {
            return new this.constructor().copy(this)
        }

        copy(e) {
            return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
        }

        getArea() {
            return eq.subVectors(this.c, this.b), eX.subVectors(this.a, this.b), .5 * eq.cross(eX).length()
        }

        getMidpoint(e) {
            return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
        }

        getNormal(e) {
            return e2.getNormal(this.a, this.b, this.c, e)
        }

        getPlane(e) {
            return e.setFromCoplanarPoints(this.a, this.b, this.c)
        }

        getBarycoord(e, t) {
            return e2.getBarycoord(e, this.a, this.b, this.c, t)
        }

        getUV(e, t, i, r, a) {
            return !1 === e3 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), e3 = !0), e2.getInterpolation(e, this.a, this.b, this.c, t, i, r, a)
        }

        getInterpolation(e, t, i, r, a) {
            return e2.getInterpolation(e, this.a, this.b, this.c, t, i, r, a)
        }

        containsPoint(e) {
            return e2.containsPoint(e, this.a, this.b, this.c)
        }

        isFrontFacing(e) {
            return e2.isFrontFacing(this.a, this.b, this.c, e)
        }

        intersectsBox(e) {
            return e.intersectsTriangle(this)
        }

        closestPointToPoint(e, t) {
            let i, r;
            let a = this.a, n = this.b, s = this.c;
            eK.subVectors(n, a), eJ.subVectors(s, a), e$.subVectors(e, a);
            let o = eK.dot(e$), l = eJ.dot(e$);
            if (o <= 0 && l <= 0) return t.copy(a);
            e0.subVectors(e, n);
            let h = eK.dot(e0), c = eJ.dot(e0);
            if (h >= 0 && c <= h) return t.copy(n);
            let u = o * c - h * l;
            if (u <= 0 && o >= 0 && h <= 0) return i = o / (o - h), t.copy(a).addScaledVector(eK, i);
            e1.subVectors(e, s);
            let d = eK.dot(e1), p = eJ.dot(e1);
            if (p >= 0 && d <= p) return t.copy(s);
            let f = d * l - o * p;
            if (f <= 0 && l >= 0 && p <= 0) return r = l / (l - p), t.copy(a).addScaledVector(eJ, r);
            let m = h * p - d * c;
            if (m <= 0 && c - h >= 0 && d - p >= 0) return eQ.subVectors(s, n), r = (c - h) / (c - h + (d - p)), t.copy(n).addScaledVector(eQ, r);
            let g = 1 / (m + f + u);
            return i = f * g, r = u * g, t.copy(a).addScaledVector(eK, i).addScaledVector(eJ, r)
        }

        equals(e) {
            return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
        }
    }

    let e4 = 0;

    class e5 extends h {
        constructor() {
            super(), this.isMaterial = !0, Object.defineProperty(this, "id", {value: e4++}), this.uuid = p(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0
        }

        get alphaTest() {
            return this._alphaTest
        }

        set alphaTest(e) {
            this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e
        }

        onBuild() {
        }

        onBeforeRender() {
        }

        onBeforeCompile() {
        }

        customProgramCacheKey() {
            return this.onBeforeCompile.toString()
        }

        setValues(e) {
            if (void 0 !== e) for (let t in e) {
                let i = e[t];
                if (void 0 === i) {
                    console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
                    continue
                }
                let r = this[t];
                if (void 0 === r) {
                    console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
                    continue
                }
                r && r.isColor ? r.set(i) : r && r.isVector3 && i && i.isVector3 ? r.copy(i) : this[t] = i
            }
        }

        toJSON(e) {
            let t = void 0 === e || "string" == typeof e;
            t && (e = {textures: {}, images: {}});
            let i = {metadata: {version: 4.6, type: "Material", generator: "Material.toJSON"}};

            function r(e) {
                let t = [];
                for (let i in e) {
                    let r = e[i];
                    delete r.metadata, t.push(r)
                }
                return t
            }

            if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), void 0 !== this.roughness && (i.roughness = this.roughness), void 0 !== this.metalness && (i.metalness = this.metalness), void 0 !== this.sheen && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (i.shininess = this.shininess), void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), void 0 !== this.iridescence && (i.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (i.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), void 0 !== this.anisotropy && (i.anisotropy = this.anisotropy), void 0 !== this.anisotropyRotation && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, void 0 !== this.combine && (i.combine = this.combine)), void 0 !== this.envMapIntensity && (i.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), void 0 !== this.transmission && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), void 0 !== this.thickness && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), void 0 !== this.attenuationDistance && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (i.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (i.size = this.size), null !== this.shadowSide && (i.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (i.blending = this.blending), 0 !== this.side && (i.side = this.side), this.vertexColors && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), !0 === this.transparent && (i.transparent = this.transparent), i.depthFunc = this.depthFunc, i.depthTest = this.depthTest, i.depthWrite = this.depthWrite, i.colorWrite = this.colorWrite, i.stencilWrite = this.stencilWrite, i.stencilWriteMask = this.stencilWriteMask, i.stencilFunc = this.stencilFunc, i.stencilRef = this.stencilRef, i.stencilFuncMask = this.stencilFuncMask, i.stencilFail = this.stencilFail, i.stencilZFail = this.stencilZFail, i.stencilZPass = this.stencilZPass, void 0 !== this.rotation && 0 !== this.rotation && (i.rotation = this.rotation), !0 === this.polygonOffset && (i.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (i.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (i.polygonOffsetUnits = this.polygonOffsetUnits), void 0 !== this.linewidth && 1 !== this.linewidth && (i.linewidth = this.linewidth), void 0 !== this.dashSize && (i.dashSize = this.dashSize), void 0 !== this.gapSize && (i.gapSize = this.gapSize), void 0 !== this.scale && (i.scale = this.scale), !0 === this.dithering && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), !0 === this.alphaHash && (i.alphaHash = this.alphaHash), !0 === this.alphaToCoverage && (i.alphaToCoverage = this.alphaToCoverage), !0 === this.premultipliedAlpha && (i.premultipliedAlpha = this.premultipliedAlpha), !0 === this.forceSinglePass && (i.forceSinglePass = this.forceSinglePass), !0 === this.wireframe && (i.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin), !0 === this.flatShading && (i.flatShading = this.flatShading), !1 === this.visible && (i.visible = !1), !1 === this.toneMapped && (i.toneMapped = !1), !1 === this.fog && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData), t) {
                let t = r(e.textures), a = r(e.images);
                t.length > 0 && (i.textures = t), a.length > 0 && (i.images = a)
            }
            return i
        }

        clone() {
            return new this.constructor().copy(this)
        }

        copy(e) {
            this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
            let t = e.clippingPlanes, i = null;
            if (null !== t) {
                let e = t.length;
                i = Array(e);
                for (let r = 0; r !== e; ++r) i[r] = t[r].clone()
            }
            return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this
        }

        dispose() {
            this.dispatchEvent({type: "dispose"})
        }

        set needsUpdate(e) {
            !0 === e && this.version++
        }
    }

    let e6 = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    }, e8 = {h: 0, s: 0, l: 0}, e7 = {h: 0, s: 0, l: 0};

    function e9(e, t, i) {
        return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6) ? e + (t - e) * 6 * i : i < .5 ? t : i < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - i) : e
    }

    class te {
        constructor(e, t, i) {
            return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, i)
        }

        set(e, t, i) {
            return void 0 === t && void 0 === i ? e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e) : this.setRGB(e, t, i), this
        }

        setScalar(e) {
            return this.r = e, this.g = e, this.b = e, this
        }

        setHex(e, t = n) {
            return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, D.toWorkingColorSpace(this, t), this
        }

        setRGB(e, t, i, r = D.workingColorSpace) {
            return this.r = e, this.g = t, this.b = i, D.toWorkingColorSpace(this, r), this
        }

        setHSL(e, t, i, r = D.workingColorSpace) {
            if (e = (e % 1 + 1) % 1, t = f(t, 0, 1), i = f(i, 0, 1), 0 === t) this.r = this.g = this.b = i; else {
                let r = i <= .5 ? i * (1 + t) : i + t - i * t, a = 2 * i - r;
                this.r = e9(a, r, e + 1 / 3), this.g = e9(a, r, e), this.b = e9(a, r, e - 1 / 3)
            }
            return D.toWorkingColorSpace(this, r), this
        }

        setStyle(e, t = n) {
            let i;

            function r(t) {
                void 0 !== t && 1 > parseFloat(t) && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
            }

            if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
                let a;
                let n = i[1], s = i[2];
                switch (n) {
                    case"rgb":
                    case"rgba":
                        if (a = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return r(a[4]), this.setRGB(Math.min(255, parseInt(a[1], 10)) / 255, Math.min(255, parseInt(a[2], 10)) / 255, Math.min(255, parseInt(a[3], 10)) / 255, t);
                        if (a = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return r(a[4]), this.setRGB(Math.min(100, parseInt(a[1], 10)) / 100, Math.min(100, parseInt(a[2], 10)) / 100, Math.min(100, parseInt(a[3], 10)) / 100, t);
                        break;
                    case"hsl":
                    case"hsla":
                        if (a = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return r(a[4]), this.setHSL(parseFloat(a[1]) / 360, parseFloat(a[2]) / 100, parseFloat(a[3]) / 100, t);
                        break;
                    default:
                        console.warn("THREE.Color: Unknown color model " + e)
                }
            } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
                let r = i[1], a = r.length;
                if (3 === a) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
                if (6 === a) return this.setHex(parseInt(r, 16), t);
                console.warn("THREE.Color: Invalid hex color " + e)
            } else if (e && e.length > 0) return this.setColorName(e, t);
            return this
        }

        setColorName(e, t = n) {
            let i = e6[e.toLowerCase()];
            return void 0 !== i ? this.setHex(i, t) : console.warn("THREE.Color: Unknown color " + e), this
        }

        clone() {
            return new this.constructor(this.r, this.g, this.b)
        }

        copy(e) {
            return this.r = e.r, this.g = e.g, this.b = e.b, this
        }

        copySRGBToLinear(e) {
            return this.r = E(e.r), this.g = E(e.g), this.b = E(e.b), this
        }

        copyLinearToSRGB(e) {
            return this.r = A(e.r), this.g = A(e.g), this.b = A(e.b), this
        }

        convertSRGBToLinear() {
            return this.copySRGBToLinear(this), this
        }

        convertLinearToSRGB() {
            return this.copyLinearToSRGB(this), this
        }

        getHex(e = n) {
            return D.fromWorkingColorSpace(tt.copy(this), e), 65536 * Math.round(f(255 * tt.r, 0, 255)) + 256 * Math.round(f(255 * tt.g, 0, 255)) + Math.round(f(255 * tt.b, 0, 255))
        }

        getHexString(e = n) {
            return ("000000" + this.getHex(e).toString(16)).slice(-6)
        }

        getHSL(e, t = D.workingColorSpace) {
            let i, r;
            D.fromWorkingColorSpace(tt.copy(this), t);
            let a = tt.r, n = tt.g, s = tt.b, o = Math.max(a, n, s), l = Math.min(a, n, s), h = (l + o) / 2;
            if (l === o) i = 0, r = 0; else {
                let e = o - l;
                switch (r = h <= .5 ? e / (o + l) : e / (2 - o - l), o) {
                    case a:
                        i = (n - s) / e + (n < s ? 6 : 0);
                        break;
                    case n:
                        i = (s - a) / e + 2;
                        break;
                    case s:
                        i = (a - n) / e + 4
                }
                i /= 6
            }
            return e.h = i, e.s = r, e.l = h, e
        }

        getRGB(e, t = D.workingColorSpace) {
            return D.fromWorkingColorSpace(tt.copy(this), t), e.r = tt.r, e.g = tt.g, e.b = tt.b, e
        }

        getStyle(e = n) {
            D.fromWorkingColorSpace(tt.copy(this), e);
            let t = tt.r, i = tt.g, r = tt.b;
            return e !== n ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(255 * t)},${Math.round(255 * i)},${Math.round(255 * r)})`
        }

        offsetHSL(e, t, i) {
            return this.getHSL(e8), e8.h += e, e8.s += t, e8.l += i, this.setHSL(e8.h, e8.s, e8.l), this
        }

        add(e) {
            return this.r += e.r, this.g += e.g, this.b += e.b, this
        }

        addColors(e, t) {
            return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
        }

        addScalar(e) {
            return this.r += e, this.g += e, this.b += e, this
        }

        sub(e) {
            return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this
        }

        multiply(e) {
            return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
        }

        multiplyScalar(e) {
            return this.r *= e, this.g *= e, this.b *= e, this
        }

        lerp(e, t) {
            return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
        }

        lerpColors(e, t, i) {
            return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this
        }

        lerpHSL(e, t) {
            var i, r, a;
            this.getHSL(e8), e.getHSL(e7);
            let n = (i = e8.h, (1 - t) * i + t * e7.h), s = (r = e8.s, (1 - t) * r + t * e7.s),
                o = (a = e8.l, (1 - t) * a + t * e7.l);
            return this.setHSL(n, s, o), this
        }

        setFromVector3(e) {
            return this.r = e.x, this.g = e.y, this.b = e.z, this
        }

        applyMatrix3(e) {
            let t = this.r, i = this.g, r = this.b, a = e.elements;
            return this.r = a[0] * t + a[3] * i + a[6] * r, this.g = a[1] * t + a[4] * i + a[7] * r, this.b = a[2] * t + a[5] * i + a[8] * r, this
        }

        equals(e) {
            return e.r === this.r && e.g === this.g && e.b === this.b
        }

        fromArray(e, t = 0) {
            return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this
        }

        toArray(e = [], t = 0) {
            return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
        }

        fromBufferAttribute(e, t) {
            return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this
        }

        toJSON() {
            return this.getHex()
        }

        * [Symbol.iterator]() {
            yield this.r, yield this.g, yield this.b
        }
    }

    let tt = new te;
    te.NAMES = e6;

    class ti extends e5 {
        constructor(e) {
            super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new te(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e)
        }

        copy(e) {
            return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this
        }
    }

    let tr = new W, ta = new x;

    class tn {
        constructor(e, t, i = !1) {
            if (Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = void 0 !== e ? e.length / t : 0, this.normalized = i, this.usage = 35044, this.updateRange = {
                offset: 0,
                count: -1
            }, this.gpuType = 1015, this.version = 0
        }

        onUploadCallback() {
        }

        set needsUpdate(e) {
            !0 === e && this.version++
        }

        setUsage(e) {
            return this.usage = e, this
        }

        copy(e) {
            return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this
        }

        copyAt(e, t, i) {
            e *= this.itemSize, i *= t.itemSize;
            for (let r = 0, a = this.itemSize; r < a; r++) this.array[e + r] = t.array[i + r];
            return this
        }

        copyArray(e) {
            return this.array.set(e), this
        }

        applyMatrix3(e) {
            if (2 === this.itemSize) for (let t = 0, i = this.count; t < i; t++) ta.fromBufferAttribute(this, t), ta.applyMatrix3(e), this.setXY(t, ta.x, ta.y); else if (3 === this.itemSize) for (let t = 0, i = this.count; t < i; t++) tr.fromBufferAttribute(this, t), tr.applyMatrix3(e), this.setXYZ(t, tr.x, tr.y, tr.z);
            return this
        }

        applyMatrix4(e) {
            for (let t = 0, i = this.count; t < i; t++) tr.fromBufferAttribute(this, t), tr.applyMatrix4(e), this.setXYZ(t, tr.x, tr.y, tr.z);
            return this
        }

        applyNormalMatrix(e) {
            for (let t = 0, i = this.count; t < i; t++) tr.fromBufferAttribute(this, t), tr.applyNormalMatrix(e), this.setXYZ(t, tr.x, tr.y, tr.z);
            return this
        }

        transformDirection(e) {
            for (let t = 0, i = this.count; t < i; t++) tr.fromBufferAttribute(this, t), tr.transformDirection(e), this.setXYZ(t, tr.x, tr.y, tr.z);
            return this
        }

        set(e, t = 0) {
            return this.array.set(e, t), this
        }

        getComponent(e, t) {
            let i = this.array[e * this.itemSize + t];
            return this.normalized && (i = v(i, this.array)), i
        }

        setComponent(e, t, i) {
            return this.normalized && (i = _(i, this.array)), this.array[e * this.itemSize + t] = i, this
        }

        getX(e) {
            let t = this.array[e * this.itemSize];
            return this.normalized && (t = v(t, this.array)), t
        }

        setX(e, t) {
            return this.normalized && (t = _(t, this.array)), this.array[e * this.itemSize] = t, this
        }

        getY(e) {
            let t = this.array[e * this.itemSize + 1];
            return this.normalized && (t = v(t, this.array)), t
        }

        setY(e, t) {
            return this.normalized && (t = _(t, this.array)), this.array[e * this.itemSize + 1] = t, this
        }

        getZ(e) {
            let t = this.array[e * this.itemSize + 2];
            return this.normalized && (t = v(t, this.array)), t
        }

        setZ(e, t) {
            return this.normalized && (t = _(t, this.array)), this.array[e * this.itemSize + 2] = t, this
        }

        getW(e) {
            let t = this.array[e * this.itemSize + 3];
            return this.normalized && (t = v(t, this.array)), t
        }

        setW(e, t) {
            return this.normalized && (t = _(t, this.array)), this.array[e * this.itemSize + 3] = t, this
        }

        setXY(e, t, i) {
            return e *= this.itemSize, this.normalized && (t = _(t, this.array), i = _(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this
        }

        setXYZ(e, t, i, r) {
            return e *= this.itemSize, this.normalized && (t = _(t, this.array), i = _(i, this.array), r = _(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = r, this
        }

        setXYZW(e, t, i, r, a) {
            return e *= this.itemSize, this.normalized && (t = _(t, this.array), i = _(i, this.array), r = _(r, this.array), a = _(a, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = r, this.array[e + 3] = a, this
        }

        onUpload(e) {
            return this.onUploadCallback = e, this
        }

        clone() {
            return new this.constructor(this.array, this.itemSize).copy(this)
        }

        toJSON() {
            let e = {
                itemSize: this.itemSize,
                type: this.array.constructor.name,
                array: Array.from(this.array),
                normalized: this.normalized
            };
            return "" !== this.name && (e.name = this.name), 35044 !== this.usage && (e.usage = this.usage), (0 !== this.updateRange.offset || -1 !== this.updateRange.count) && (e.updateRange = this.updateRange), e
        }
    }

    class ts extends tn {
        constructor(e, t, i) {
            super(new Uint16Array(e), t, i)
        }
    }

    class to extends tn {
        constructor(e, t, i) {
            super(new Uint32Array(e), t, i)
        }
    }

    class tl extends tn {
        constructor(e, t, i) {
            super(new Float32Array(e), t, i)
        }
    }

    let th = 0, tc = new ey, tu = new ej, td = new W, tp = new X, tf = new X, tm = new W;

    class tg extends h {
        constructor() {
            super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {value: th++}), this.uuid = p(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
                start: 0,
                count: 1 / 0
            }, this.userData = {}
        }

        getIndex() {
            return this.index
        }

        setIndex(e) {
            return Array.isArray(e) ? this.index = new (S(e) ? to : ts)(e, 1) : this.index = e, this
        }

        getAttribute(e) {
            return this.attributes[e]
        }

        setAttribute(e, t) {
            return this.attributes[e] = t, this
        }

        deleteAttribute(e) {
            return delete this.attributes[e], this
        }

        hasAttribute(e) {
            return void 0 !== this.attributes[e]
        }

        addGroup(e, t, i = 0) {
            this.groups.push({start: e, count: t, materialIndex: i})
        }

        clearGroups() {
            this.groups = []
        }

        setDrawRange(e, t) {
            this.drawRange.start = e, this.drawRange.count = t
        }

        applyMatrix4(e) {
            let t = this.attributes.position;
            void 0 !== t && (t.applyMatrix4(e), t.needsUpdate = !0);
            let i = this.attributes.normal;
            if (void 0 !== i) {
                let t = new y().getNormalMatrix(e);
                i.applyNormalMatrix(t), i.needsUpdate = !0
            }
            let r = this.attributes.tangent;
            return void 0 !== r && (r.transformDirection(e), r.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
        }

        applyQuaternion(e) {
            return tc.makeRotationFromQuaternion(e), this.applyMatrix4(tc), this
        }

        rotateX(e) {
            return tc.makeRotationX(e), this.applyMatrix4(tc), this
        }

        rotateY(e) {
            return tc.makeRotationY(e), this.applyMatrix4(tc), this
        }

        rotateZ(e) {
            return tc.makeRotationZ(e), this.applyMatrix4(tc), this
        }

        translate(e, t, i) {
            return tc.makeTranslation(e, t, i), this.applyMatrix4(tc), this
        }

        scale(e, t, i) {
            return tc.makeScale(e, t, i), this.applyMatrix4(tc), this
        }

        lookAt(e) {
            return tu.lookAt(e), tu.updateMatrix(), this.applyMatrix4(tu.matrix), this
        }

        center() {
            return this.computeBoundingBox(), this.boundingBox.getCenter(td).negate(), this.translate(td.x, td.y, td.z), this
        }

        setFromPoints(e) {
            let t = [];
            for (let i = 0, r = e.length; i < r; i++) {
                let r = e[i];
                t.push(r.x, r.y, r.z || 0)
            }
            return this.setAttribute("position", new tl(t, 3)), this
        }

        computeBoundingBox() {
            null === this.boundingBox && (this.boundingBox = new X);
            let e = this.attributes.position, t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute) {
                console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(new W(-1 / 0, -1 / 0, -1 / 0), new W(Infinity, Infinity, Infinity));
                return
            }
            if (void 0 !== e) {
                if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, i = t.length; e < i; e++) {
                    let i = t[e];
                    tp.setFromBufferAttribute(i), this.morphTargetsRelative ? (tm.addVectors(this.boundingBox.min, tp.min), this.boundingBox.expandByPoint(tm), tm.addVectors(this.boundingBox.max, tp.max), this.boundingBox.expandByPoint(tm)) : (this.boundingBox.expandByPoint(tp.min), this.boundingBox.expandByPoint(tp.max))
                }
            } else this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        }

        computeBoundingSphere() {
            null === this.boundingSphere && (this.boundingSphere = new eu);
            let e = this.attributes.position, t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute) {
                console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new W, 1 / 0);
                return
            }
            if (e) {
                let i = this.boundingSphere.center;
                if (tp.setFromBufferAttribute(e), t) for (let e = 0, i = t.length; e < i; e++) {
                    let i = t[e];
                    tf.setFromBufferAttribute(i), this.morphTargetsRelative ? (tm.addVectors(tp.min, tf.min), tp.expandByPoint(tm), tm.addVectors(tp.max, tf.max), tp.expandByPoint(tm)) : (tp.expandByPoint(tf.min), tp.expandByPoint(tf.max))
                }
                tp.getCenter(i);
                let r = 0;
                for (let t = 0, a = e.count; t < a; t++) tm.fromBufferAttribute(e, t), r = Math.max(r, i.distanceToSquared(tm));
                if (t) for (let a = 0, n = t.length; a < n; a++) {
                    let n = t[a], s = this.morphTargetsRelative;
                    for (let t = 0, a = n.count; t < a; t++) tm.fromBufferAttribute(n, t), s && (td.fromBufferAttribute(e, t), tm.add(td)), r = Math.max(r, i.distanceToSquared(tm))
                }
                this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
            }
        }

        computeTangents() {
            let e = this.index, t = this.attributes;
            if (null === e || void 0 === t.position || void 0 === t.normal || void 0 === t.uv) {
                console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
                return
            }
            let i = e.array, r = t.position.array, a = t.normal.array, n = t.uv.array, s = r.length / 3;
            !1 === this.hasAttribute("tangent") && this.setAttribute("tangent", new tn(new Float32Array(4 * s), 4));
            let o = this.getAttribute("tangent").array, l = [], h = [];
            for (let e = 0; e < s; e++) l[e] = new W, h[e] = new W;
            let c = new W, u = new W, d = new W, p = new x, f = new x, m = new x, g = new W, v = new W, _ = this.groups;
            0 === _.length && (_ = [{start: 0, count: i.length}]);
            for (let e = 0, t = _.length; e < t; ++e) {
                let t = _[e], a = t.start, s = t.count;
                for (let e = a, t = a + s; e < t; e += 3) !function (e, t, i) {
                    c.fromArray(r, 3 * e), u.fromArray(r, 3 * t), d.fromArray(r, 3 * i), p.fromArray(n, 2 * e), f.fromArray(n, 2 * t), m.fromArray(n, 2 * i), u.sub(c), d.sub(c), f.sub(p), m.sub(p);
                    let a = 1 / (f.x * m.y - m.x * f.y);
                    isFinite(a) && (g.copy(u).multiplyScalar(m.y).addScaledVector(d, -f.y).multiplyScalar(a), v.copy(d).multiplyScalar(f.x).addScaledVector(u, -m.x).multiplyScalar(a), l[e].add(g), l[t].add(g), l[i].add(g), h[e].add(v), h[t].add(v), h[i].add(v))
                }(i[e + 0], i[e + 1], i[e + 2])
            }
            let y = new W, M = new W, S = new W, b = new W;

            function w(e) {
                S.fromArray(a, 3 * e), b.copy(S);
                let t = l[e];
                y.copy(t), y.sub(S.multiplyScalar(S.dot(t))).normalize(), M.crossVectors(b, t);
                let i = M.dot(h[e]);
                o[4 * e] = y.x, o[4 * e + 1] = y.y, o[4 * e + 2] = y.z, o[4 * e + 3] = i < 0 ? -1 : 1
            }

            for (let e = 0, t = _.length; e < t; ++e) {
                let t = _[e], r = t.start, a = t.count;
                for (let e = r, t = r + a; e < t; e += 3) w(i[e + 0]), w(i[e + 1]), w(i[e + 2])
            }
        }

        computeVertexNormals() {
            let e = this.index, t = this.getAttribute("position");
            if (void 0 !== t) {
                let i = this.getAttribute("normal");
                if (void 0 === i) i = new tn(new Float32Array(3 * t.count), 3), this.setAttribute("normal", i); else for (let e = 0, t = i.count; e < t; e++) i.setXYZ(e, 0, 0, 0);
                let r = new W, a = new W, n = new W, s = new W, o = new W, l = new W, h = new W, c = new W;
                if (e) for (let u = 0, d = e.count; u < d; u += 3) {
                    let d = e.getX(u + 0), p = e.getX(u + 1), f = e.getX(u + 2);
                    r.fromBufferAttribute(t, d), a.fromBufferAttribute(t, p), n.fromBufferAttribute(t, f), h.subVectors(n, a), c.subVectors(r, a), h.cross(c), s.fromBufferAttribute(i, d), o.fromBufferAttribute(i, p), l.fromBufferAttribute(i, f), s.add(h), o.add(h), l.add(h), i.setXYZ(d, s.x, s.y, s.z), i.setXYZ(p, o.x, o.y, o.z), i.setXYZ(f, l.x, l.y, l.z)
                } else for (let e = 0, s = t.count; e < s; e += 3) r.fromBufferAttribute(t, e + 0), a.fromBufferAttribute(t, e + 1), n.fromBufferAttribute(t, e + 2), h.subVectors(n, a), c.subVectors(r, a), h.cross(c), i.setXYZ(e + 0, h.x, h.y, h.z), i.setXYZ(e + 1, h.x, h.y, h.z), i.setXYZ(e + 2, h.x, h.y, h.z);
                this.normalizeNormals(), i.needsUpdate = !0
            }
        }

        normalizeNormals() {
            let e = this.attributes.normal;
            for (let t = 0, i = e.count; t < i; t++) tm.fromBufferAttribute(e, t), tm.normalize(), e.setXYZ(t, tm.x, tm.y, tm.z)
        }

        toNonIndexed() {
            function e(e, t) {
                let i = e.array, r = e.itemSize, a = e.normalized, n = new i.constructor(t.length * r), s = 0, o = 0;
                for (let a = 0, l = t.length; a < l; a++) {
                    s = e.isInterleavedBufferAttribute ? t[a] * e.data.stride + e.offset : t[a] * r;
                    for (let e = 0; e < r; e++) n[o++] = i[s++]
                }
                return new tn(n, r, a)
            }

            if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
            let t = new tg, i = this.index.array, r = this.attributes;
            for (let a in r) {
                let n = r[a], s = e(n, i);
                t.setAttribute(a, s)
            }
            let a = this.morphAttributes;
            for (let r in a) {
                let n = [], s = a[r];
                for (let t = 0, r = s.length; t < r; t++) {
                    let r = s[t], a = e(r, i);
                    n.push(a)
                }
                t.morphAttributes[r] = n
            }
            t.morphTargetsRelative = this.morphTargetsRelative;
            let n = this.groups;
            for (let e = 0, i = n.length; e < i; e++) {
                let i = n[e];
                t.addGroup(i.start, i.count, i.materialIndex)
            }
            return t
        }

        toJSON() {
            let e = {metadata: {version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON"}};
            if (e.uuid = this.uuid, e.type = this.type, "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters) {
                let t = this.parameters;
                for (let i in t) void 0 !== t[i] && (e[i] = t[i]);
                return e
            }
            e.data = {attributes: {}};
            let t = this.index;
            null !== t && (e.data.index = {type: t.array.constructor.name, array: Array.prototype.slice.call(t.array)});
            let i = this.attributes;
            for (let t in i) {
                let r = i[t];
                e.data.attributes[t] = r.toJSON(e.data)
            }
            let r = {}, a = !1;
            for (let t in this.morphAttributes) {
                let i = this.morphAttributes[t], n = [];
                for (let t = 0, r = i.length; t < r; t++) {
                    let r = i[t];
                    n.push(r.toJSON(e.data))
                }
                n.length > 0 && (r[t] = n, a = !0)
            }
            a && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
            let n = this.groups;
            n.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(n)));
            let s = this.boundingSphere;
            return null !== s && (e.data.boundingSphere = {center: s.center.toArray(), radius: s.radius}), e
        }

        clone() {
            return new this.constructor().copy(this)
        }

        copy(e) {
            this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
            let t = {};
            this.name = e.name;
            let i = e.index;
            null !== i && this.setIndex(i.clone(t));
            let r = e.attributes;
            for (let e in r) {
                let i = r[e];
                this.setAttribute(e, i.clone(t))
            }
            let a = e.morphAttributes;
            for (let e in a) {
                let i = [], r = a[e];
                for (let e = 0, a = r.length; e < a; e++) i.push(r[e].clone(t));
                this.morphAttributes[e] = i
            }
            this.morphTargetsRelative = e.morphTargetsRelative;
            let n = e.groups;
            for (let e = 0, t = n.length; e < t; e++) {
                let t = n[e];
                this.addGroup(t.start, t.count, t.materialIndex)
            }
            let s = e.boundingBox;
            null !== s && (this.boundingBox = s.clone());
            let o = e.boundingSphere;
            return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this
        }

        dispose() {
            this.dispatchEvent({type: "dispose"})
        }
    }

    let tv = new ey, t_ = new ex, tx = new eu, ty = new W, tM = new W, tS = new W, tb = new W, tw = new W, tT = new W,
        tE = new x, tA = new x, tC = new x, tL = new W, tP = new W, tR = new W, tD = new W, tU = new W;

    class tI extends ej {
        constructor(e = new tg, t = new ti) {
            super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets()
        }

        copy(e, t) {
            return super.copy(e, t), void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this
        }

        updateMorphTargets() {
            let e = this.geometry, t = e.morphAttributes, i = Object.keys(t);
            if (i.length > 0) {
                let e = t[i[0]];
                if (void 0 !== e) {
                    this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                    for (let t = 0, i = e.length; t < i; t++) {
                        let i = e[t].name || String(t);
                        this.morphTargetInfluences.push(0), this.morphTargetDictionary[i] = t
                    }
                }
            }
        }

        getVertexPosition(e, t) {
            let i = this.geometry, r = i.attributes.position, a = i.morphAttributes.position,
                n = i.morphTargetsRelative;
            t.fromBufferAttribute(r, e);
            let s = this.morphTargetInfluences;
            if (a && s) {
                tT.set(0, 0, 0);
                for (let i = 0, r = a.length; i < r; i++) {
                    let r = s[i], o = a[i];
                    0 !== r && (tw.fromBufferAttribute(o, e), n ? tT.addScaledVector(tw, r) : tT.addScaledVector(tw.sub(t), r))
                }
                t.add(tT)
            }
            return t
        }

        raycast(e, t) {
            let i = this.geometry, r = this.material, a = this.matrixWorld;
            if (void 0 !== r) {
                if (null === i.boundingSphere && i.computeBoundingSphere(), tx.copy(i.boundingSphere), tx.applyMatrix4(a), t_.copy(e.ray).recast(e.near), !1 === tx.containsPoint(t_.origin) && (null === t_.intersectSphere(tx, ty) || t_.origin.distanceToSquared(ty) > (e.far - e.near) ** 2) || (tv.copy(a).invert(), t_.copy(e.ray).applyMatrix4(tv), null !== i.boundingBox && !1 === t_.intersectsBox(i.boundingBox))) return;
                this._computeIntersections(e, t, t_)
            }
        }

        _computeIntersections(e, t, i) {
            let r;
            let a = this.geometry, n = this.material, s = a.index, o = a.attributes.position, l = a.attributes.uv,
                h = a.attributes.uv1, c = a.attributes.normal, u = a.groups, d = a.drawRange;
            if (null !== s) {
                if (Array.isArray(n)) for (let a = 0, o = u.length; a < o; a++) {
                    let o = u[a], p = n[o.materialIndex], f = Math.max(o.start, d.start),
                        m = Math.min(s.count, Math.min(o.start + o.count, d.start + d.count));
                    for (let a = f; a < m; a += 3) {
                        let n = s.getX(a), u = s.getX(a + 1), d = s.getX(a + 2);
                        (r = tN(this, p, e, i, l, h, c, n, u, d)) && (r.faceIndex = Math.floor(a / 3), r.face.materialIndex = o.materialIndex, t.push(r))
                    }
                } else {
                    let a = Math.max(0, d.start), o = Math.min(s.count, d.start + d.count);
                    for (let u = a; u < o; u += 3) {
                        let a = s.getX(u), o = s.getX(u + 1), d = s.getX(u + 2);
                        (r = tN(this, n, e, i, l, h, c, a, o, d)) && (r.faceIndex = Math.floor(u / 3), t.push(r))
                    }
                }
            } else if (void 0 !== o) {
                if (Array.isArray(n)) for (let a = 0, s = u.length; a < s; a++) {
                    let s = u[a], p = n[s.materialIndex], f = Math.max(s.start, d.start),
                        m = Math.min(o.count, Math.min(s.start + s.count, d.start + d.count));
                    for (let a = f; a < m; a += 3) {
                        let n = a, o = a + 1, u = a + 2;
                        (r = tN(this, p, e, i, l, h, c, n, o, u)) && (r.faceIndex = Math.floor(a / 3), r.face.materialIndex = s.materialIndex, t.push(r))
                    }
                } else {
                    let a = Math.max(0, d.start), s = Math.min(o.count, d.start + d.count);
                    for (let o = a; o < s; o += 3) {
                        let a = o, s = o + 1, u = o + 2;
                        (r = tN(this, n, e, i, l, h, c, a, s, u)) && (r.faceIndex = Math.floor(o / 3), t.push(r))
                    }
                }
            }
        }
    }

    function tN(e, t, i, r, a, n, s, o, l, h) {
        e.getVertexPosition(o, tM), e.getVertexPosition(l, tS), e.getVertexPosition(h, tb);
        let c = function (e, t, i, r, a, n, s, o) {
            if (null === (1 === t.side ? r.intersectTriangle(s, n, a, !0, o) : r.intersectTriangle(a, n, s, 0 === t.side, o))) return null;
            tU.copy(o), tU.applyMatrix4(e.matrixWorld);
            let l = i.ray.origin.distanceTo(tU);
            return l < i.near || l > i.far ? null : {distance: l, point: tU.clone(), object: e}
        }(e, t, i, r, tM, tS, tb, tD);
        if (c) {
            a && (tE.fromBufferAttribute(a, o), tA.fromBufferAttribute(a, l), tC.fromBufferAttribute(a, h), c.uv = e2.getInterpolation(tD, tM, tS, tb, tE, tA, tC, new x)), n && (tE.fromBufferAttribute(n, o), tA.fromBufferAttribute(n, l), tC.fromBufferAttribute(n, h), c.uv1 = e2.getInterpolation(tD, tM, tS, tb, tE, tA, tC, new x), c.uv2 = c.uv1), s && (tL.fromBufferAttribute(s, o), tP.fromBufferAttribute(s, l), tR.fromBufferAttribute(s, h), c.normal = e2.getInterpolation(tD, tM, tS, tb, tL, tP, tR, new W), c.normal.dot(r.direction) > 0 && c.normal.multiplyScalar(-1));
            let e = {a: o, b: l, c: h, normal: new W, materialIndex: 0};
            e2.getNormal(tM, tS, tb, e.normal), c.face = e
        }
        return c
    }

    class tO extends tg {
        constructor(e = 1, t = 1, i = 1, r = 1, a = 1, n = 1) {
            super(), this.type = "BoxGeometry", this.parameters = {
                width: e,
                height: t,
                depth: i,
                widthSegments: r,
                heightSegments: a,
                depthSegments: n
            };
            let s = this;
            r = Math.floor(r), a = Math.floor(a), n = Math.floor(n);
            let o = [], l = [], h = [], c = [], u = 0, d = 0;

            function p(e, t, i, r, a, n, p, f, m, g, v) {
                let _ = n / m, x = p / g, y = n / 2, M = p / 2, S = f / 2, b = m + 1, w = g + 1, T = 0, E = 0,
                    A = new W;
                for (let n = 0; n < w; n++) {
                    let s = n * x - M;
                    for (let o = 0; o < b; o++) {
                        let u = o * _ - y;
                        A[e] = u * r, A[t] = s * a, A[i] = S, l.push(A.x, A.y, A.z), A[e] = 0, A[t] = 0, A[i] = f > 0 ? 1 : -1, h.push(A.x, A.y, A.z), c.push(o / m), c.push(1 - n / g), T += 1
                    }
                }
                for (let e = 0; e < g; e++) for (let t = 0; t < m; t++) {
                    let i = u + t + b * e, r = u + t + b * (e + 1), a = u + (t + 1) + b * (e + 1),
                        n = u + (t + 1) + b * e;
                    o.push(i, r, n), o.push(r, a, n), E += 6
                }
                s.addGroup(d, E, v), d += E, u += T
            }

            p("z", "y", "x", -1, -1, i, t, e, n, a, 0), p("z", "y", "x", 1, -1, i, t, -e, n, a, 1), p("x", "z", "y", 1, 1, e, i, t, r, n, 2), p("x", "z", "y", 1, -1, e, i, -t, r, n, 3), p("x", "y", "z", 1, -1, e, t, i, r, a, 4), p("x", "y", "z", -1, -1, e, t, -i, r, a, 5), this.setIndex(o), this.setAttribute("position", new tl(l, 3)), this.setAttribute("normal", new tl(h, 3)), this.setAttribute("uv", new tl(c, 2))
        }

        copy(e) {
            return super.copy(e), this.parameters = Object.assign({}, e.parameters), this
        }

        static fromJSON(e) {
            return new tO(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments)
        }
    }

    function tz(e) {
        let t = {};
        for (let i in e) for (let r in t[i] = {}, e[i]) {
            let a = e[i][r];
            a && (a.isColor || a.isMatrix3 || a.isMatrix4 || a.isVector2 || a.isVector3 || a.isVector4 || a.isTexture || a.isQuaternion) ? a.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[i][r] = null) : t[i][r] = a.clone() : Array.isArray(a) ? t[i][r] = a.slice() : t[i][r] = a
        }
        return t
    }

    function tF(e) {
        let t = {};
        for (let i = 0; i < e.length; i++) {
            let r = tz(e[i]);
            for (let e in r) t[e] = r[e]
        }
        return t
    }

    function tB(e) {
        return null === e.getRenderTarget() ? e.outputColorSpace : s
    }

    let tk = {clone: tz, merge: tF};

    class tH extends e5 {
        constructor(e) {
            super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}", this.fragmentShader = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
                derivatives: !1,
                fragDepth: !1,
                drawBuffers: !1,
                shaderTextureLOD: !1
            }, this.defaultAttributeValues = {
                color: [1, 1, 1],
                uv: [0, 0],
                uv1: [0, 0]
            }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== e && this.setValues(e)
        }

        copy(e) {
            return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = tz(e.uniforms), this.uniformsGroups = function (e) {
                let t = [];
                for (let i = 0; i < e.length; i++) t.push(e[i].clone());
                return t
            }(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this
        }

        toJSON(e) {
            let t = super.toJSON(e);
            for (let i in t.glslVersion = this.glslVersion, t.uniforms = {}, this.uniforms) {
                let r = this.uniforms[i], a = r.value;
                a && a.isTexture ? t.uniforms[i] = {
                    type: "t",
                    value: a.toJSON(e).uuid
                } : a && a.isColor ? t.uniforms[i] = {
                    type: "c",
                    value: a.getHex()
                } : a && a.isVector2 ? t.uniforms[i] = {
                    type: "v2",
                    value: a.toArray()
                } : a && a.isVector3 ? t.uniforms[i] = {
                    type: "v3",
                    value: a.toArray()
                } : a && a.isVector4 ? t.uniforms[i] = {
                    type: "v4",
                    value: a.toArray()
                } : a && a.isMatrix3 ? t.uniforms[i] = {
                    type: "m3",
                    value: a.toArray()
                } : a && a.isMatrix4 ? t.uniforms[i] = {type: "m4", value: a.toArray()} : t.uniforms[i] = {value: a}
            }
            Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
            let i = {};
            for (let e in this.extensions) !0 === this.extensions[e] && (i[e] = !0);
            return Object.keys(i).length > 0 && (t.extensions = i), t
        }
    }

    class tV extends ej {
        constructor() {
            super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ey, this.projectionMatrix = new ey, this.projectionMatrixInverse = new ey, this.coordinateSystem = 2e3
        }

        copy(e, t) {
            return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this
        }

        getWorldDirection(e) {
            this.updateWorldMatrix(!0, !1);
            let t = this.matrixWorld.elements;
            return e.set(-t[8], -t[9], -t[10]).normalize()
        }

        updateMatrixWorld(e) {
            super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }

        updateWorldMatrix(e, t) {
            super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }

        clone() {
            return new this.constructor().copy(this)
        }
    }

    class tG extends tV {
        constructor(e = 50, t = 1, i = .1, r = 2e3) {
            super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
        }

        copy(e, t) {
            return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = null === e.view ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this
        }

        setFocalLength(e) {
            let t = .5 * this.getFilmHeight() / e;
            this.fov = 2 * d * Math.atan(t), this.updateProjectionMatrix()
        }

        getFocalLength() {
            let e = Math.tan(.5 * u * this.fov);
            return .5 * this.getFilmHeight() / e
        }

        getEffectiveFOV() {
            return 2 * d * Math.atan(Math.tan(.5 * u * this.fov) / this.zoom)
        }

        getFilmWidth() {
            return this.filmGauge * Math.min(this.aspect, 1)
        }

        getFilmHeight() {
            return this.filmGauge / Math.max(this.aspect, 1)
        }

        setViewOffset(e, t, i, r, a, n) {
            this.aspect = e / t, null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = r, this.view.width = a, this.view.height = n, this.updateProjectionMatrix()
        }

        clearViewOffset() {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
        }

        updateProjectionMatrix() {
            let e = this.near, t = e * Math.tan(.5 * u * this.fov) / this.zoom, i = 2 * t, r = this.aspect * i,
                a = -.5 * r, n = this.view;
            if (null !== this.view && this.view.enabled) {
                let e = n.fullWidth, s = n.fullHeight;
                a += n.offsetX * r / e, t -= n.offsetY * i / s, r *= n.width / e, i *= n.height / s
            }
            let s = this.filmOffset;
            0 !== s && (a += e * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(a, a + r, t, t - i, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }

        toJSON(e) {
            let t = super.toJSON(e);
            return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, null !== this.view && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t
        }
    }

    class tW extends ej {
        constructor(e, t, i) {
            super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null;
            let r = new tG(-90, 1, e, t);
            r.layers = this.layers, this.add(r);
            let a = new tG(-90, 1, e, t);
            a.layers = this.layers, this.add(a);
            let n = new tG(-90, 1, e, t);
            n.layers = this.layers, this.add(n);
            let s = new tG(-90, 1, e, t);
            s.layers = this.layers, this.add(s);
            let o = new tG(-90, 1, e, t);
            o.layers = this.layers, this.add(o);
            let l = new tG(-90, 1, e, t);
            l.layers = this.layers, this.add(l)
        }

        updateCoordinateSystem() {
            let e = this.coordinateSystem, t = this.children.concat(), [i, r, a, n, s, o] = t;
            for (let e of t) this.remove(e);
            if (2e3 === e) i.up.set(0, 1, 0), i.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), a.up.set(0, 0, -1), a.lookAt(0, 1, 0), n.up.set(0, 0, 1), n.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1); else if (2001 === e) i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), a.up.set(0, 0, 1), a.lookAt(0, 1, 0), n.up.set(0, 0, -1), n.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1); else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
            for (let e of t) this.add(e), e.updateMatrixWorld()
        }

        update(e, t) {
            null === this.parent && this.updateMatrixWorld();
            let i = this.renderTarget;
            this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
            let [r, a, n, s, o, l] = this.children, h = e.getRenderTarget(), c = e.xr.enabled;
            e.xr.enabled = !1;
            let u = i.texture.generateMipmaps;
            i.texture.generateMipmaps = !1, e.setRenderTarget(i, 0), e.render(t, r), e.setRenderTarget(i, 1), e.render(t, a), e.setRenderTarget(i, 2), e.render(t, n), e.setRenderTarget(i, 3), e.render(t, s), e.setRenderTarget(i, 4), e.render(t, o), i.texture.generateMipmaps = u, e.setRenderTarget(i, 5), e.render(t, l), e.setRenderTarget(h), e.xr.enabled = c, i.texture.needsPMREMUpdate = !0
        }
    }

    class tj extends F {
        constructor(e, t, i, r, a, n, s, o, l, h) {
            super(e = void 0 !== e ? e : [], t = void 0 !== t ? t : 301, i, r, a, n, s, o, l, h), this.isCubeTexture = !0, this.flipY = !1
        }

        get images() {
            return this.image
        }

        set images(e) {
            this.image = e
        }
    }

    class tq extends H {
        constructor(e = 1, t = {}) {
            super(e, e, t), this.isWebGLCubeRenderTarget = !0;
            let i = {width: e, height: e, depth: 1};
            void 0 !== t.encoding && (T("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), t.colorSpace = 3001 === t.encoding ? n : ""), this.texture = new tj([i, i, i, i, i, i], t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = void 0 !== t.generateMipmaps && t.generateMipmaps, this.texture.minFilter = void 0 !== t.minFilter ? t.minFilter : 1006
        }

        fromEquirectangularTexture(e, t) {
            this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
            let i = {
                uniforms: {tEquirect: {value: null}}, vertexShader: `varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
}`, fragmentShader: `uniform sampler2D tEquirect;varying vec3 vWorldDirection;
#include <common>
void main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}`
            }, r = new tO(5, 5, 5), a = new tH({
                name: "CubemapFromEquirect",
                uniforms: tz(i.uniforms),
                vertexShader: i.vertexShader,
                fragmentShader: i.fragmentShader,
                side: 1,
                blending: 0
            });
            a.uniforms.tEquirect.value = t;
            let n = new tI(r, a), s = t.minFilter;
            1008 === t.minFilter && (t.minFilter = 1006);
            let o = new tW(1, 10, this);
            return o.update(e, n), t.minFilter = s, n.geometry.dispose(), n.material.dispose(), this
        }

        clear(e, t, i, r) {
            let a = e.getRenderTarget();
            for (let a = 0; a < 6; a++) e.setRenderTarget(this, a), e.clear(t, i, r);
            e.setRenderTarget(a)
        }
    }

    let tX = new W, tY = new W, tZ = new y;

    class tK {
        constructor(e = new W(1, 0, 0), t = 0) {
            this.isPlane = !0, this.normal = e, this.constant = t
        }

        set(e, t) {
            return this.normal.copy(e), this.constant = t, this
        }

        setComponents(e, t, i, r) {
            return this.normal.set(e, t, i), this.constant = r, this
        }

        setFromNormalAndCoplanarPoint(e, t) {
            return this.normal.copy(e), this.constant = -t.dot(this.normal), this
        }

        setFromCoplanarPoints(e, t, i) {
            let r = tX.subVectors(i, t).cross(tY.subVectors(e, t)).normalize();
            return this.setFromNormalAndCoplanarPoint(r, e), this
        }

        copy(e) {
            return this.normal.copy(e.normal), this.constant = e.constant, this
        }

        normalize() {
            let e = 1 / this.normal.length();
            return this.normal.multiplyScalar(e), this.constant *= e, this
        }

        negate() {
            return this.constant *= -1, this.normal.negate(), this
        }

        distanceToPoint(e) {
            return this.normal.dot(e) + this.constant
        }

        distanceToSphere(e) {
            return this.distanceToPoint(e.center) - e.radius
        }

        projectPoint(e, t) {
            return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e))
        }

        intersectLine(e, t) {
            let i = e.delta(tX), r = this.normal.dot(i);
            if (0 === r) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null;
            let a = -(e.start.dot(this.normal) + this.constant) / r;
            return a < 0 || a > 1 ? null : t.copy(e.start).addScaledVector(i, a)
        }

        intersectsLine(e) {
            let t = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
            return t < 0 && i > 0 || i < 0 && t > 0
        }

        intersectsBox(e) {
            return e.intersectsPlane(this)
        }

        intersectsSphere(e) {
            return e.intersectsPlane(this)
        }

        coplanarPoint(e) {
            return e.copy(this.normal).multiplyScalar(-this.constant)
        }

        applyMatrix4(e, t) {
            let i = t || tZ.getNormalMatrix(e), r = this.coplanarPoint(tX).applyMatrix4(e),
                a = this.normal.applyMatrix3(i).normalize();
            return this.constant = -r.dot(a), this
        }

        translate(e) {
            return this.constant -= e.dot(this.normal), this
        }

        equals(e) {
            return e.normal.equals(this.normal) && e.constant === this.constant
        }

        clone() {
            return new this.constructor().copy(this)
        }
    }

    let tJ = new eu, tQ = new W;

    class t$ {
        constructor(e = new tK, t = new tK, i = new tK, r = new tK, a = new tK, n = new tK) {
            this.planes = [e, t, i, r, a, n]
        }

        set(e, t, i, r, a, n) {
            let s = this.planes;
            return s[0].copy(e), s[1].copy(t), s[2].copy(i), s[3].copy(r), s[4].copy(a), s[5].copy(n), this
        }

        copy(e) {
            let t = this.planes;
            for (let i = 0; i < 6; i++) t[i].copy(e.planes[i]);
            return this
        }

        setFromProjectionMatrix(e, t = 2e3) {
            let i = this.planes, r = e.elements, a = r[0], n = r[1], s = r[2], o = r[3], l = r[4], h = r[5], c = r[6],
                u = r[7], d = r[8], p = r[9], f = r[10], m = r[11], g = r[12], v = r[13], _ = r[14], x = r[15];
            if (i[0].setComponents(o - a, u - l, m - d, x - g).normalize(), i[1].setComponents(o + a, u + l, m + d, x + g).normalize(), i[2].setComponents(o + n, u + h, m + p, x + v).normalize(), i[3].setComponents(o - n, u - h, m - p, x - v).normalize(), i[4].setComponents(o - s, u - c, m - f, x - _).normalize(), 2e3 === t) i[5].setComponents(o + s, u + c, m + f, x + _).normalize(); else if (2001 === t) i[5].setComponents(s, c, f, _).normalize(); else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
            return this
        }

        intersectsObject(e) {
            if (void 0 !== e.boundingSphere) null === e.boundingSphere && e.computeBoundingSphere(), tJ.copy(e.boundingSphere).applyMatrix4(e.matrixWorld); else {
                let t = e.geometry;
                null === t.boundingSphere && t.computeBoundingSphere(), tJ.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)
            }
            return this.intersectsSphere(tJ)
        }

        intersectsSprite(e) {
            return tJ.center.set(0, 0, 0), tJ.radius = .7071067811865476, tJ.applyMatrix4(e.matrixWorld), this.intersectsSphere(tJ)
        }

        intersectsSphere(e) {
            let t = this.planes, i = e.center, r = -e.radius;
            for (let e = 0; e < 6; e++) {
                let a = t[e].distanceToPoint(i);
                if (a < r) return !1
            }
            return !0
        }

        intersectsBox(e) {
            let t = this.planes;
            for (let i = 0; i < 6; i++) {
                let r = t[i];
                if (tQ.x = r.normal.x > 0 ? e.max.x : e.min.x, tQ.y = r.normal.y > 0 ? e.max.y : e.min.y, tQ.z = r.normal.z > 0 ? e.max.z : e.min.z, 0 > r.distanceToPoint(tQ)) return !1
            }
            return !0
        }

        containsPoint(e) {
            let t = this.planes;
            for (let i = 0; i < 6; i++) if (0 > t[i].distanceToPoint(e)) return !1;
            return !0
        }

        clone() {
            return new this.constructor().copy(this)
        }
    }

    function t0() {
        let e = null, t = !1, i = null, r = null;

        function a(t, n) {
            i(t, n), r = e.requestAnimationFrame(a)
        }

        return {
            start: function () {
                !0 !== t && null !== i && (r = e.requestAnimationFrame(a), t = !0)
            }, stop: function () {
                e.cancelAnimationFrame(r), t = !1
            }, setAnimationLoop: function (e) {
                i = e
            }, setContext: function (t) {
                e = t
            }
        }
    }

    function t1(e, t) {
        let i = t.isWebGL2, r = new WeakMap;
        return {
            get: function (e) {
                return e.isInterleavedBufferAttribute && (e = e.data), r.get(e)
            }, remove: function (t) {
                t.isInterleavedBufferAttribute && (t = t.data);
                let i = r.get(t);
                i && (e.deleteBuffer(i.buffer), r.delete(t))
            }, update: function (t, a) {
                if (t.isGLBufferAttribute) {
                    let e = r.get(t);
                    (!e || e.version < t.version) && r.set(t, {
                        buffer: t.buffer,
                        type: t.type,
                        bytesPerElement: t.elementSize,
                        version: t.version
                    });
                    return
                }
                t.isInterleavedBufferAttribute && (t = t.data);
                let n = r.get(t);
                void 0 === n ? r.set(t, function (t, r) {
                    let a;
                    let n = t.array, s = t.usage, o = e.createBuffer();
                    if (e.bindBuffer(r, o), e.bufferData(r, n, s), t.onUploadCallback(), n instanceof Float32Array) a = 5126; else if (n instanceof Uint16Array) {
                        if (t.isFloat16BufferAttribute) {
                            if (i) a = 5131; else throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.")
                        } else a = 5123
                    } else if (n instanceof Int16Array) a = 5122; else if (n instanceof Uint32Array) a = 5125; else if (n instanceof Int32Array) a = 5124; else if (n instanceof Int8Array) a = 5120; else if (n instanceof Uint8Array) a = 5121; else if (n instanceof Uint8ClampedArray) a = 5121; else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + n);
                    return {buffer: o, type: a, bytesPerElement: n.BYTES_PER_ELEMENT, version: t.version}
                }(t, a)) : n.version < t.version && (!function (t, r, a) {
                    let n = r.array, s = r.updateRange;
                    e.bindBuffer(a, t), -1 === s.count ? e.bufferSubData(a, 0, n) : (i ? e.bufferSubData(a, s.offset * n.BYTES_PER_ELEMENT, n, s.offset, s.count) : e.bufferSubData(a, s.offset * n.BYTES_PER_ELEMENT, n.subarray(s.offset, s.offset + s.count)), s.count = -1), r.onUploadCallback()
                }(n.buffer, t, a), n.version = t.version)
            }
        }
    }

    class t3 extends tg {
        constructor(e = 1, t = 1, i = 1, r = 1) {
            super(), this.type = "PlaneGeometry", this.parameters = {
                width: e,
                height: t,
                widthSegments: i,
                heightSegments: r
            };
            let a = e / 2, n = t / 2, s = Math.floor(i), o = Math.floor(r), l = s + 1, h = o + 1, c = e / s, u = t / o,
                d = [], p = [], f = [], m = [];
            for (let e = 0; e < h; e++) {
                let t = e * u - n;
                for (let i = 0; i < l; i++) {
                    let r = i * c - a;
                    p.push(r, -t, 0), f.push(0, 0, 1), m.push(i / s), m.push(1 - e / o)
                }
            }
            for (let e = 0; e < o; e++) for (let t = 0; t < s; t++) {
                let i = t + l * e, r = t + l * (e + 1), a = t + 1 + l * (e + 1), n = t + 1 + l * e;
                d.push(i, r, n), d.push(r, a, n)
            }
            this.setIndex(d), this.setAttribute("position", new tl(p, 3)), this.setAttribute("normal", new tl(f, 3)), this.setAttribute("uv", new tl(m, 2))
        }

        copy(e) {
            return super.copy(e), this.parameters = Object.assign({}, e.parameters), this
        }

        static fromJSON(e) {
            return new t3(e.width, e.height, e.widthSegments, e.heightSegments)
        }
    }

    var t2 = `#ifdef USE_ALPHAHASH
if(diffuseColor.a<getAlphaHashThreshold(vPosition))discard;
#endif`, t4 = `#ifdef USE_ALPHAHASH
const float ALPHA_HASH_SCALE=0.05;float hash2D(vec2 value){return fract(1.0e4*sin(17.0*value.x+0.1*value.y)*(0.1+abs(sin(13.0*value.y+value.x))));}float hash3D(vec3 value){return hash2D(vec2(hash2D(value.xy),value.z));}float getAlphaHashThreshold(vec3 position){float maxDeriv=max(length(dFdx(position.xyz)),length(dFdy(position.xyz)));float pixScale=1.0/(ALPHA_HASH_SCALE*maxDeriv);vec2 pixScales=vec2(exp2(floor(log2(pixScale))),exp2(ceil(log2(pixScale))));vec2 alpha=vec2(hash3D(floor(pixScales.x*position.xyz)),hash3D(floor(pixScales.y*position.xyz)));float lerpFactor=fract(log2(pixScale));float x=(1.0-lerpFactor)*alpha.x+lerpFactor*alpha.y;float a=min(lerpFactor,1.0-lerpFactor);vec3 cases=vec3(x*x/(2.0*a*(1.0-a)),(x-0.5*a)/(1.0-a),1.0-((1.0-x)*(1.0-x)/(2.0*a*(1.0-a))));float threshold=(x<(1.0-a))?((x<a)?cases.x:cases.y):cases.z;return clamp(threshold,1.0e-6,1.0);}
#endif`, t5 = `#ifdef USE_ALPHAMAP
diffuseColor.a*=texture2D(alphaMap,vAlphaMapUv).g;
#endif`, t6 = `#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`, t8 = `#ifdef USE_ALPHATEST
if(diffuseColor.a<alphaTest)discard;
#endif`, t7 = `#ifdef USE_ALPHATEST
uniform float alphaTest;
#endif`, t9 = `#ifdef USE_AOMAP
float ambientOcclusion=(texture2D(aoMap,vAoMapUv).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;
#if defined(USE_ENVMAP)&&defined(STANDARD)
float dotNV=saturate(dot(geometry.normal,geometry.viewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.roughness);
#endif
#endif`, ie = `#ifdef USE_AOMAP
uniform sampler2D aoMap;uniform float aoMapIntensity;
#endif`, it = `vec3 transformed=vec3(position);
#ifdef USE_ALPHAHASH
vPosition=vec3(position);
#endif`, ii = `vec3 objectNormal=vec3(normal);
#ifdef USE_TANGENT
vec3 objectTangent=vec3(tangent.xyz);
#endif`, ir = `#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(3.2404542,-0.9692660,0.0556434,-1.5371385,1.8760108,-0.2040259,-0.4985314,0.0415560,1.0572252);vec3 Fresnel0ToIor(vec3 fresnel0){vec3 sqrtF0=sqrt(fresnel0);return(vec3(1.0)+sqrtF0)/(vec3(1.0)-sqrtF0);}vec3 IorToFresnel0(vec3 transmittedIor,float incidentIor){return pow2((transmittedIor-vec3(incidentIor))/(transmittedIor+vec3(incidentIor)));}float IorToFresnel0(float transmittedIor,float incidentIor){return pow2((transmittedIor-incidentIor)/(transmittedIor+incidentIor));}vec3 evalSensitivity(float OPD,vec3 shift){float phase=2.0*PI*OPD*1.0e-9;vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-pow2(phase)*var);xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*pow2(phase));xyz/=1.0685e-7;vec3 rgb=XYZ_TO_REC709*xyz;return rgb;}vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0){vec3 I;float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));float sinTheta2Sq=pow2(outsideIOR/iridescenceIOR)*(1.0-pow2(cosTheta1));float cosTheta2Sq=1.0-sinTheta2Sq;if(cosTheta2Sq<0.0){return vec3(1.0);}float cosTheta2=sqrt(cosTheta2Sq);float R0=IorToFresnel0(iridescenceIOR,outsideIOR);float R12=F_Schlick(R0,1.0,cosTheta1);float T121=1.0-R12;float phi12=0.0;if(iridescenceIOR<outsideIOR)phi12=PI;float phi21=PI-phi12;vec3 baseIOR=Fresnel0ToIor(clamp(baseF0,0.0,0.9999));vec3 R1=IorToFresnel0(baseIOR,iridescenceIOR);vec3 R23=F_Schlick(R1,1.0,cosTheta2);vec3 phi23=vec3(0.0);if(baseIOR[0]<iridescenceIOR)phi23[0]=PI;if(baseIOR[1]<iridescenceIOR)phi23[1]=PI;if(baseIOR[2]<iridescenceIOR)phi23[2]=PI;float OPD=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,0.9999);vec3 r123=sqrt(R123);vec3 Rs=pow2(T121)*R23/(vec3(1.0)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for(int m=1;m<=2;++m){Cm*=r123;vec3 Sm=2.0*evalSensitivity(float(m)*OPD,float(m)*phi);I+=Cm*Sm;}return max(I,vec3(0.0));}
#endif`, ia = `#ifdef USE_BUMPMAP
uniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vBumpMapUv);vec2 dSTdy=dFdy(vBumpMapUv);float Hll=bumpScale*texture2D(bumpMap,vBumpMapUv).x;float dBx=bumpScale*texture2D(bumpMap,vBumpMapUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vBumpMapUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=dFdx(surf_pos.xyz);vec3 vSigmaY=dFdy(surf_pos.xyz);vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}
#endif`, is = `#if NUM_CLIPPING_PLANES>0
vec4 plane;
#pragma unroll_loop_start
for(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}
#pragma unroll_loop_end
#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES
bool clipped=true;
#pragma unroll_loop_start
for(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}
#pragma unroll_loop_end
if(clipped)discard;
#endif
#endif`, io = `#if NUM_CLIPPING_PLANES>0
varying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];
#endif`, il = `#if NUM_CLIPPING_PLANES>0
varying vec3 vClipPosition;
#endif`, ih = `#if NUM_CLIPPING_PLANES>0
vClipPosition=-mvPosition.xyz;
#endif`, ic = `#if defined(USE_COLOR_ALPHA)
diffuseColor*=vColor;
#elif defined(USE_COLOR)
diffuseColor.rgb*=vColor;
#endif`, iu = `#if defined(USE_COLOR_ALPHA)
varying vec4 vColor;
#elif defined(USE_COLOR)
varying vec3 vColor;
#endif`, id = `#if defined(USE_COLOR_ALPHA)
varying vec4 vColor;
#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)
varying vec3 vColor;
#endif`, ip = `#if defined(USE_COLOR_ALPHA)
vColor=vec4(1.0);
#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)
vColor=vec3(1.0);
#endif
#ifdef USE_COLOR
vColor*=color;
#endif
#ifdef USE_INSTANCING_COLOR
vColor.xyz*=instanceColor.xyz;
#endif`, im = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a)clamp(a,0.0,1.0)
#endif
#define whiteComplement(a)(1.0-saturate(a))
float pow2(const in float x){return x*x;}vec3 pow2(const in vec3 x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float max3(const in vec3 v){return max(max(v.x,v.y),v.z);}float average(const in vec3 v){return dot(v,vec3(0.3333333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}
#ifdef HIGH_PRECISION
float precisionSafeLength(vec3 v){return length(v);}
#else
float precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}
#endif
struct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};struct GeometricContext{vec3 position;vec3 normal;vec3 viewDir;
#ifdef USE_CLEARCOAT
vec3 clearcoatNormal;
#endif
};
#ifdef USE_ALPHAHASH
varying vec3 vPosition;
#endif
vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float luminance(const in vec3 rgb){const vec3 weights=vec3(0.2126729,0.7151522,0.0721750);return dot(weights,rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}vec3 BRDF_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}float F_Schlick(const in float f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}`,
        ig = `#ifdef ENVMAP_TYPE_CUBE_UV
#define cubeUV_minMipLevel 4.0
#define cubeUV_minTileSize 16.0
float getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);highp vec2 uv=getUV(direction,face)*(faceSize-2.0)+1.0;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;uv.x+=filterInt*3.0*cubeUV_minTileSize;uv.y+=4.0*(exp2(CUBEUV_MAX_MIP)-faceSize);uv.x*=CUBEUV_TEXEL_WIDTH;uv.y*=CUBEUV_TEXEL_HEIGHT;
#ifdef texture2DGradEXT
return texture2DGradEXT(envMap,uv,vec2(0.0),vec2(0.0)).rgb;
#else
return texture2D(envMap,uv).rgb;
#endif
}
#define cubeUV_r0 1.0
#define cubeUV_v0 0.339
#define cubeUV_m0-2.0
#define cubeUV_r1 0.8
#define cubeUV_v1 0.276
#define cubeUV_m1-1.0
#define cubeUV_r4 0.4
#define cubeUV_v4 0.046
#define cubeUV_m4 2.0
#define cubeUV_r5 0.305
#define cubeUV_v5 0.016
#define cubeUV_m5 3.0
#define cubeUV_r6 0.21
#define cubeUV_v6 0.0038
#define cubeUV_m6 4.0
float roughnessToMip(float roughness){float mip=0.0;if(roughness>=cubeUV_r1){mip=(cubeUV_r0-roughness)*(cubeUV_m1-cubeUV_m0)/(cubeUV_r0-cubeUV_r1)+cubeUV_m0;}else if(roughness>=cubeUV_r4){mip=(cubeUV_r1-roughness)*(cubeUV_m4-cubeUV_m1)/(cubeUV_r1-cubeUV_r4)+cubeUV_m1;}else if(roughness>=cubeUV_r5){mip=(cubeUV_r4-roughness)*(cubeUV_m5-cubeUV_m4)/(cubeUV_r4-cubeUV_r5)+cubeUV_m4;}else if(roughness>=cubeUV_r6){mip=(cubeUV_r5-roughness)*(cubeUV_m6-cubeUV_m5)/(cubeUV_r5-cubeUV_r6)+cubeUV_m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),cubeUV_m0,CUBEUV_MAX_MIP);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}
#endif`, iv = `vec3 transformedNormal=objectNormal;
#ifdef USE_INSTANCING
mat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;
#endif
transformedNormal=normalMatrix*transformedNormal;
#ifdef FLIP_SIDED
transformedNormal=-transformedNormal;
#endif
#ifdef USE_TANGENT
vec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;
#ifdef FLIP_SIDED
transformedTangent=-transformedTangent;
#endif
#endif`, i_ = `#ifdef USE_DISPLACEMENTMAP
uniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;
#endif`, ix = `#ifdef USE_DISPLACEMENTMAP
transformed+=normalize(objectNormal)*(texture2D(displacementMap,vDisplacementMapUv).x*displacementScale+displacementBias);
#endif`, iy = `#ifdef USE_EMISSIVEMAP
vec4 emissiveColor=texture2D(emissiveMap,vEmissiveMapUv);totalEmissiveRadiance*=emissiveColor.rgb;
#endif`, iM = `#ifdef USE_EMISSIVEMAP
uniform sampler2D emissiveMap;
#endif`, iS = `#ifdef USE_ENVMAP
#ifdef ENV_WORLDPOS
vec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);
#ifdef ENVMAP_MODE_REFLECTION
vec3 reflectVec=reflect(cameraToFrag,worldNormal);
#else
vec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);
#endif
#else
vec3 reflectVec=vReflect;
#endif
#ifdef ENVMAP_TYPE_CUBE
vec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));
#else
vec4 envColor=vec4(0.0);
#endif
#ifdef ENVMAP_BLENDING_MULTIPLY
outgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);
#elif defined(ENVMAP_BLENDING_MIX)
outgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);
#elif defined(ENVMAP_BLENDING_ADD)
outgoingLight+=envColor.xyz*specularStrength*reflectivity;
#endif
#endif`, ib = `#ifdef USE_ENVMAP
uniform float envMapIntensity;uniform float flipEnvMap;
#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#else
uniform sampler2D envMap;
#endif
#endif`, iw = `#ifdef USE_ENVMAP
uniform float reflectivity;
#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)||defined(LAMBERT)
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;uniform float refractionRatio;
#else
varying vec3 vReflect;
#endif
#endif`, iT = `#ifdef USE_ENVMAP
#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)||defined(LAMBERT)
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;
#else
varying vec3 vReflect;uniform float refractionRatio;
#endif
#endif`, iE = `#ifdef USE_ENVMAP
#ifdef ENV_WORLDPOS
vWorldPosition=worldPosition.xyz;
#else
vec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);
#ifdef ENVMAP_MODE_REFLECTION
vReflect=reflect(cameraToVertex,worldNormal);
#else
vReflect=refract(cameraToVertex,worldNormal,refractionRatio);
#endif
#endif
#endif`, iA = `#ifdef USE_FOG
vFogDepth=-mvPosition.z;
#endif`, iC = `#ifdef USE_FOG
varying float vFogDepth;
#endif`, iL = `#ifdef USE_FOG
#ifdef FOG_EXP2
float fogFactor=1.0-exp(-fogDensity*fogDensity*vFogDepth*vFogDepth);
#else
float fogFactor=smoothstep(fogNear,fogFar,vFogDepth);
#endif
gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);
#endif`, iP = `#ifdef USE_FOG
uniform vec3 fogColor;varying float vFogDepth;
#ifdef FOG_EXP2
uniform float fogDensity;
#else
uniform float fogNear;uniform float fogFar;
#endif
#endif`, iR = `#ifdef USE_GRADIENTMAP
uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);
#ifdef USE_GRADIENTMAP
return vec3(texture2D(gradientMap,coord).r);
#else
vec2 fw=fwidth(coord)*0.5;return mix(vec3(0.7),vec3(1.0),smoothstep(0.7-fw.x,0.7+fw.x,coord.x));
#endif
}`, iD = `#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vLightMapUv);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;reflectedLight.indirectDiffuse+=lightMapIrradiance;
#endif`, iU = `#ifdef USE_LIGHTMAP
uniform sampler2D lightMap;uniform float lightMapIntensity;
#endif`, iI = `varying vec3 vViewPosition;struct LambertMaterial{vec3 diffuseColor;float specularStrength;};void RE_Direct_Lambert(const in IncidentLight directLight,const in GeometricContext geometry,const in LambertMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Lambert(const in vec3 irradiance,const in GeometricContext geometry,const in LambertMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_Lambert
#define RE_IndirectDiffuse RE_IndirectDiffuse_Lambert`, iN = `uniform bool receiveShadow;uniform vec3 ambientLightColor;uniform vec3 lightProbe[9];vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in vec3 normal){vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;return irradiance;}float getDistanceAttenuation(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){
#if defined(LEGACY_LIGHTS)
if(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;
#else
float distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;
#endif
}float getSpotAttenuation(const in float coneCosine,const in float penumbraCosine,const in float angleCosine){return smoothstep(coneCosine,penumbraCosine,angleCosine);}
#if NUM_DIR_LIGHTS>0
struct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalLightInfo(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight light){light.color=directionalLight.color;light.direction=directionalLight.direction;light.visible=true;}
#endif
#if NUM_POINT_LIGHTS>0
struct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointLightInfo(const in PointLight pointLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=pointLight.position-geometry.position;light.direction=normalize(lVector);float lightDistance=length(lVector);light.color=pointLight.color;light.color*=getDistanceAttenuation(lightDistance,pointLight.distance,pointLight.decay);light.visible=(light.color!=vec3(0.0));}
#endif
#if NUM_SPOT_LIGHTS>0
struct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotLightInfo(const in SpotLight spotLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=spotLight.position-geometry.position;light.direction=normalize(lVector);float angleCos=dot(light.direction,spotLight.direction);float spotAttenuation=getSpotAttenuation(spotLight.coneCos,spotLight.penumbraCos,angleCos);if(spotAttenuation>0.0){float lightDistance=length(lVector);light.color=spotLight.color*spotAttenuation;light.color*=getDistanceAttenuation(lightDistance,spotLight.distance,spotLight.decay);light.visible=(light.color!=vec3(0.0));}else{light.color=vec3(0.0);light.visible=false;}}
#endif
#if NUM_RECT_AREA_LIGHTS>0
struct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];
#endif
#if NUM_HEMI_LIGHTS>0
struct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in vec3 normal){float dotNL=dot(normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);return irradiance;}
#endif`, iO = `#ifdef USE_ENVMAP
vec3 getIBLIrradiance(const in vec3 normal){
#ifdef ENVMAP_TYPE_CUBE_UV
vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);return PI*envMapColor.rgb*envMapIntensity;
#else
return vec3(0.0);
#endif
}vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness){
#ifdef ENVMAP_TYPE_CUBE_UV
vec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));reflectVec=inverseTransformDirection(reflectVec,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);return envMapColor.rgb*envMapIntensity;
#else
return vec3(0.0);
#endif
}
#ifdef USE_ANISOTROPY
vec3 getIBLAnisotropyRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness,const in vec3 bitangent,const in float anisotropy){
#ifdef ENVMAP_TYPE_CUBE_UV
vec3 bentNormal=cross(bitangent,viewDir);bentNormal=normalize(cross(bentNormal,bitangent));bentNormal=normalize(mix(bentNormal,normal,pow2(pow2(1.0-anisotropy*(1.0-roughness)))));return getIBLRadiance(viewDir,bentNormal,roughness);
#else
return vec3(0.0);
#endif
}
#endif
#endif`, iz = `varying vec3 vViewPosition;struct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometry.normal,directLight.direction)*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_Toon
#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon`, iF = `varying vec3 vViewPosition;struct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_BlinnPhong(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_BlinnPhong
#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong`, iB = `PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(geometryNormal)),abs(dFdy(geometryNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.roughness=max(roughnessFactor,0.0525);material.roughness+=geometryRoughness;material.roughness=min(material.roughness,1.0);
#ifdef IOR
material.ior=ior;
#ifdef USE_SPECULAR
float specularIntensityFactor=specularIntensity;vec3 specularColorFactor=specularColor;
#ifdef USE_SPECULAR_COLORMAP
specularColorFactor*=texture2D(specularColorMap,vSpecularColorMapUv).rgb;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
specularIntensityFactor*=texture2D(specularIntensityMap,vSpecularIntensityMapUv).a;
#endif
material.specularF90=mix(specularIntensityFactor,1.0,metalnessFactor);
#else
float specularIntensityFactor=1.0;vec3 specularColorFactor=vec3(1.0);material.specularF90=1.0;
#endif
material.specularColor=mix(min(pow2((material.ior-1.0)/(material.ior+1.0))*specularColorFactor,vec3(1.0))*specularIntensityFactor,diffuseColor.rgb,metalnessFactor);
#else
material.specularColor=mix(vec3(0.04),diffuseColor.rgb,metalnessFactor);material.specularF90=1.0;
#endif
#ifdef USE_CLEARCOAT
material.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;material.clearcoatF0=vec3(0.04);material.clearcoatF90=1.0;
#ifdef USE_CLEARCOATMAP
material.clearcoat*=texture2D(clearcoatMap,vClearcoatMapUv).x;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
material.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vClearcoatRoughnessMapUv).y;
#endif
material.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);
#endif
#ifdef USE_IRIDESCENCE
material.iridescence=iridescence;material.iridescenceIOR=iridescenceIOR;
#ifdef USE_IRIDESCENCEMAP
material.iridescence*=texture2D(iridescenceMap,vIridescenceMapUv).r;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
material.iridescenceThickness=(iridescenceThicknessMaximum-iridescenceThicknessMinimum)*texture2D(iridescenceThicknessMap,vIridescenceThicknessMapUv).g+iridescenceThicknessMinimum;
#else
material.iridescenceThickness=iridescenceThicknessMaximum;
#endif
#endif
#ifdef USE_SHEEN
material.sheenColor=sheenColor;
#ifdef USE_SHEEN_COLORMAP
material.sheenColor*=texture2D(sheenColorMap,vSheenColorMapUv).rgb;
#endif
material.sheenRoughness=clamp(sheenRoughness,0.07,1.0);
#ifdef USE_SHEEN_ROUGHNESSMAP
material.sheenRoughness*=texture2D(sheenRoughnessMap,vSheenRoughnessMapUv).a;
#endif
#endif
#ifdef USE_ANISOTROPY
#ifdef USE_ANISOTROPYMAP
mat2 anisotropyMat=mat2(anisotropyVector.x,anisotropyVector.y,-anisotropyVector.y,anisotropyVector.x);vec3 anisotropyPolar=texture2D(anisotropyMap,vAnisotropyMapUv).rgb;vec2 anisotropyV=anisotropyMat*normalize(2.0*anisotropyPolar.rg-vec2(1.0))*anisotropyPolar.b;
#else
vec2 anisotropyV=anisotropyVector;
#endif
material.anisotropy=length(anisotropyV);anisotropyV/=material.anisotropy;material.anisotropy=saturate(material.anisotropy);material.alphaT=mix(pow2(material.roughness),1.0,pow2(material.anisotropy));material.anisotropyT=tbn[0]*anisotropyV.x-tbn[1]*anisotropyV.y;material.anisotropyB=tbn[1]*anisotropyV.x+tbn[0]*anisotropyV.y;
#endif`, ik = `struct PhysicalMaterial{vec3 diffuseColor;float roughness;vec3 specularColor;float specularF90;
#ifdef USE_CLEARCOAT
float clearcoat;float clearcoatRoughness;vec3 clearcoatF0;float clearcoatF90;
#endif
#ifdef USE_IRIDESCENCE
float iridescence;float iridescenceIOR;float iridescenceThickness;vec3 iridescenceFresnel;vec3 iridescenceF0;
#endif
#ifdef USE_SHEEN
vec3 sheenColor;float sheenRoughness;
#endif
#ifdef IOR
float ior;
#endif
#ifdef USE_TRANSMISSION
float transmission;float transmissionAlpha;float thickness;float attenuationDistance;vec3 attenuationColor;
#endif
#ifdef USE_ANISOTROPY
float anisotropy;float alphaT;vec3 anisotropyT;vec3 anisotropyB;
#endif
};vec3 clearcoatSpecular=vec3(0.0);vec3 sheenSpecular=vec3(0.0);vec3 Schlick_to_F0(const in vec3 f,const in float f90,const in float dotVH){float x=clamp(1.0-dotVH,0.0,1.0);float x2=x*x;float x5=clamp(x*x2*x2,0.0,0.9999);return(f-vec3(f90)*x5)/(1.0-x5);}float V_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}
#ifdef USE_ANISOTROPY
float V_GGX_SmithCorrelated_Anisotropic(const in float alphaT,const in float alphaB,const in float dotTV,const in float dotBV,const in float dotTL,const in float dotBL,const in float dotNV,const in float dotNL){float gv=dotNL*length(vec3(alphaT*dotTV,alphaB*dotBV,dotNV));float gl=dotNV*length(vec3(alphaT*dotTL,alphaB*dotBL,dotNL));float v=0.5/(gv+gl);return saturate(v);}float D_GGX_Anisotropic(const in float alphaT,const in float alphaB,const in float dotNH,const in float dotTH,const in float dotBH){float a2=alphaT*alphaB;highp vec3 v=vec3(alphaB*dotTH,alphaT*dotBH,a2*dotNH);highp float v2=dot(v,v);float w2=a2/v2;return RECIPROCAL_PI*a2*pow2(w2);}
#endif
#ifdef USE_CLEARCOAT
vec3 BRDF_GGX_Clearcoat(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in PhysicalMaterial material){vec3 f0=material.clearcoatF0;float f90=material.clearcoatF90;float roughness=material.clearcoatRoughness;float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}
#endif
vec3 BRDF_GGX(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in PhysicalMaterial material){vec3 f0=material.specularColor;float f90=material.specularF90;float roughness=material.roughness;float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);
#ifdef USE_IRIDESCENCE
F=mix(F,material.iridescenceFresnel,material.iridescence);
#endif
#ifdef USE_ANISOTROPY
float dotTL=dot(material.anisotropyT,lightDir);float dotTV=dot(material.anisotropyT,viewDir);float dotTH=dot(material.anisotropyT,halfDir);float dotBL=dot(material.anisotropyB,lightDir);float dotBV=dot(material.anisotropyB,viewDir);float dotBH=dot(material.anisotropyB,halfDir);float V=V_GGX_SmithCorrelated_Anisotropic(material.alphaT,alpha,dotTV,dotBV,dotTL,dotBL,dotNV,dotNL);float D=D_GGX_Anisotropic(material.alphaT,alpha,dotNH,dotTH,dotBH);
#else
float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);
#endif
return F*(V*D);}vec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}
#if defined(USE_SHEEN)
float D_Charlie(float roughness,float dotNH){float alpha=pow2(roughness);float invAlpha=1.0/alpha;float cos2h=dotNH*dotNH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float dotNV,float dotNL){return saturate(1.0/(4.0*(dotNL+dotNV-dotNL*dotNV)));}vec3 BRDF_Sheen(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,vec3 sheenColor,const in float sheenRoughness){vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float D=D_Charlie(sheenRoughness,dotNH);float V=V_Neubelt(dotNV,dotNL);return sheenColor*(D*V);}
#endif
float IBLSheenBRDF(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));float r2=roughness*roughness;float a=roughness<0.25?-339.2*r2+161.4*roughness-25.9:-8.48*r2+14.3*roughness-9.95;float b=roughness<0.25?44.0*r2-23.7*roughness+3.26:1.97*r2-3.27*roughness+0.72;float DG=exp(a*dotNV+b)+(roughness<0.25?0.0:0.1*(roughness-0.25));return saturate(DG*RECIPROCAL_PI);}vec2 DFGApprox(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;vec2 fab=vec2(-1.04,1.04)*a004+r.zw;return fab;}vec3 EnvironmentBRDF(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness){vec2 fab=DFGApprox(normal,viewDir,roughness);return specularColor*fab.x+specularF90*fab.y;}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float iridescence,const in vec3 iridescenceF0,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){
#else
void computeMultiscattering(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){
#endif
vec2 fab=DFGApprox(normal,viewDir,roughness);
#ifdef USE_IRIDESCENCE
vec3 Fr=mix(specularColor,iridescenceF0,iridescence);
#else
vec3 Fr=specularColor;
#endif
vec3 FssEss=Fr*fab.x+specularF90*fab.y;float Ess=fab.x+fab.y;float Ems=1.0-Ess;vec3 Favg=Fr+(1.0-Fr)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}
#if NUM_RECT_AREA_LIGHTS>0
void RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometry.normal;vec3 viewDir=geometry.viewDir;vec3 position=geometry.position;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.roughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}
#endif
void RE_Direct_Physical(const in IncidentLight directLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;
#ifdef USE_CLEARCOAT
float dotNLcc=saturate(dot(geometry.clearcoatNormal,directLight.direction));vec3 ccIrradiance=dotNLcc*directLight.color;clearcoatSpecular+=ccIrradiance*BRDF_GGX_Clearcoat(directLight.direction,geometry.viewDir,geometry.clearcoatNormal,material);
#endif
#ifdef USE_SHEEN
sheenSpecular+=irradiance*BRDF_Sheen(directLight.direction,geometry.viewDir,geometry.normal,material.sheenColor,material.sheenRoughness);
#endif
reflectedLight.directSpecular+=irradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.normal,material);reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){
#ifdef USE_CLEARCOAT
clearcoatSpecular+=clearcoatRadiance*EnvironmentBRDF(geometry.clearcoatNormal,geometry.viewDir,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);
#endif
#ifdef USE_SHEEN
sheenSpecular+=irradiance*material.sheenColor*IBLSheenBRDF(geometry.normal,geometry.viewDir,material.sheenRoughness);
#endif
vec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;
#ifdef USE_IRIDESCENCE
computeMultiscatteringIridescence(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.iridescence,material.iridescenceFresnel,material.roughness,singleScattering,multiScattering);
#else
computeMultiscattering(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.roughness,singleScattering,multiScattering);
#endif
vec3 totalScattering=singleScattering+multiScattering;vec3 diffuse=material.diffuseColor*(1.0-max(max(totalScattering.r,totalScattering.g),totalScattering.b));reflectedLight.indirectSpecular+=radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}
#define RE_Direct RE_Direct_Physical
#define RE_Direct_RectArea RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular RE_IndirectSpecular_Physical
float computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}`,
        iH = `GeometricContext geometry;geometry.position=-vViewPosition;geometry.normal=normal;geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);
#ifdef USE_CLEARCOAT
geometry.clearcoatNormal=clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi=saturate(dot(normal,geometry.viewDir));if(material.iridescenceThickness==0.0){material.iridescence=0.0;}else{material.iridescence=saturate(material.iridescence);}if(material.iridescence>0.0){material.iridescenceFresnel=evalIridescence(1.0,material.iridescenceIOR,dotNVi,material.iridescenceThickness,material.specularColor);material.iridescenceF0=Schlick_to_F0(material.iridescenceFresnel,1.0,dotNVi);}
#endif
IncidentLight directLight;
#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)
PointLight pointLight;
#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0
PointLightShadow pointLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointLightInfo(pointLight,geometry,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)
pointLightShadow=pointLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;
#endif
RE_Direct(directLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)
SpotLight spotLight;vec4 spotColor;vec3 spotLightCoord;bool inSpotLightMap;
#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0
SpotLightShadow spotLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotLightInfo(spotLight,geometry,directLight);
#if (UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS)
#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
#elif (UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
#else
#define SPOT_LIGHT_MAP_INDEX(UNROLLED_LOOP_INDEX-NUM_SPOT_LIGHT_SHADOWS+NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS)
#endif
#if (SPOT_LIGHT_MAP_INDEX<NUM_SPOT_LIGHT_MAPS)
spotLightCoord=vSpotLightCoord[i].xyz/vSpotLightCoord[i].w;inSpotLightMap=all(lessThan(abs(spotLightCoord*2.-1.),vec3(1.0)));spotColor=texture2D(spotLightMap[SPOT_LIGHT_MAP_INDEX],spotLightCoord.xy);directLight.color=inSpotLightMap?directLight.color*spotColor.rgb:directLight.color;
#endif
#undef SPOT_LIGHT_MAP_INDEX
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
spotLightShadow=spotLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotLightCoord[i]):1.0;
#endif
RE_Direct(directLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)
DirectionalLight directionalLight;
#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0
DirectionalLightShadow directionalLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalLightInfo(directionalLight,geometry,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)
directionalLightShadow=directionalLightShadows[i];directLight.color*=(directLight.visible&&receiveShadow)?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;
#endif
RE_Direct(directLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)
RectAreaLight rectAreaLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if defined(RE_IndirectDiffuse)
vec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);irradiance+=getLightProbeIrradiance(lightProbe,geometry.normal);
#if (NUM_HEMI_LIGHTS>0)
#pragma unroll_loop_start
for(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometry.normal);}
#pragma unroll_loop_end
#endif
#endif
#if defined(RE_IndirectSpecular)
vec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);
#endif`, iV = `#if defined(RE_IndirectDiffuse)
#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vLightMapUv);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;irradiance+=lightMapIrradiance;
#endif
#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)
iblIrradiance+=getIBLIrradiance(geometry.normal);
#endif
#endif
#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)
#ifdef USE_ANISOTROPY
radiance+=getIBLAnisotropyRadiance(geometry.viewDir,geometry.normal,material.roughness,material.anisotropyB,material.anisotropy);
#else
radiance+=getIBLRadiance(geometry.viewDir,geometry.normal,material.roughness);
#endif
#ifdef USE_CLEARCOAT
clearcoatRadiance+=getIBLRadiance(geometry.viewDir,geometry.clearcoatNormal,material.clearcoatRoughness);
#endif
#endif`, iG = `#if defined(RE_IndirectDiffuse)
RE_IndirectDiffuse(irradiance,geometry,material,reflectedLight);
#endif
#if defined(RE_IndirectSpecular)
RE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometry,material,reflectedLight);
#endif`, iW = `#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)
gl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;
#endif`, ij = `#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)
uniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;
#endif`, iq = `#ifdef USE_LOGDEPTHBUF
#ifdef USE_LOGDEPTHBUF_EXT
varying float vFragDepth;varying float vIsPerspective;
#else
uniform float logDepthBufFC;
#endif
#endif`, iX = `#ifdef USE_LOGDEPTHBUF
#ifdef USE_LOGDEPTHBUF_EXT
vFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));
#else
if(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}
#endif
#endif`, iY = `#ifdef USE_MAP
vec4 sampledDiffuseColor=texture2D(map,vMapUv);
#ifdef DECODE_VIDEO_TEXTURE
sampledDiffuseColor=vec4(mix(pow(sampledDiffuseColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),sampledDiffuseColor.rgb*0.0773993808,vec3(lessThanEqual(sampledDiffuseColor.rgb,vec3(0.04045)))),sampledDiffuseColor.w);
#endif
diffuseColor*=sampledDiffuseColor;
#endif`, iZ = `#ifdef USE_MAP
uniform sampler2D map;
#endif`, iK = `#if defined(USE_MAP)||defined(USE_ALPHAMAP)
#if defined(USE_POINTS_UV)
vec2 uv=vUv;
#else
vec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;
#endif
#endif
#ifdef USE_MAP
diffuseColor*=texture2D(map,uv);
#endif
#ifdef USE_ALPHAMAP
diffuseColor.a*=texture2D(alphaMap,uv).g;
#endif`, iJ = `#if defined(USE_POINTS_UV)
varying vec2 vUv;
#else
#if defined(USE_MAP)||defined(USE_ALPHAMAP)
uniform mat3 uvTransform;
#endif
#endif
#ifdef USE_MAP
uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`, iQ = `float metalnessFactor=metalness;
#ifdef USE_METALNESSMAP
vec4 texelMetalness=texture2D(metalnessMap,vMetalnessMapUv);metalnessFactor*=texelMetalness.b;
#endif`, i$ = `#ifdef USE_METALNESSMAP
uniform sampler2D metalnessMap;
#endif`, i0 = `#if defined(USE_MORPHCOLORS)&&defined(MORPHTARGETS_TEXTURE)
vColor*=morphTargetBaseInfluence;for(int i=0;i<MORPHTARGETS_COUNT;i++){
#if defined(USE_COLOR_ALPHA)
if(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2)*morphTargetInfluences[i];
#elif defined(USE_COLOR)
if(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2).rgb*morphTargetInfluences[i];
#endif
}
#endif`, i1 = `#ifdef USE_MORPHNORMALS
objectNormal*=morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
for(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)objectNormal+=getMorph(gl_VertexID,i,1).xyz*morphTargetInfluences[i];}
#else
objectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];
#endif
#endif`, i3 = `#ifdef USE_MORPHTARGETS
uniform float morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
uniform float morphTargetInfluences[MORPHTARGETS_COUNT];uniform sampler2DArray morphTargetsTexture;uniform ivec2 morphTargetsTextureSize;vec4 getMorph(const in int vertexIndex,const in int morphTargetIndex,const in int offset){int texelIndex=vertexIndex*MORPHTARGETS_TEXTURE_STRIDE+offset;int y=texelIndex/morphTargetsTextureSize.x;int x=texelIndex-y*morphTargetsTextureSize.x;ivec3 morphUV=ivec3(x,y,morphTargetIndex);return texelFetch(morphTargetsTexture,morphUV,0);}
#else
#ifndef USE_MORPHNORMALS
uniform float morphTargetInfluences[8];
#else
uniform float morphTargetInfluences[4];
#endif
#endif
#endif`, i2 = `#ifdef USE_MORPHTARGETS
transformed*=morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
for(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)transformed+=getMorph(gl_VertexID,i,0).xyz*morphTargetInfluences[i];}
#else
transformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];
#ifndef USE_MORPHNORMALS
transformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];
#endif
#endif
#endif`, i4 = `float faceDirection=gl_FrontFacing?1.0:-1.0;
#ifdef FLAT_SHADED
vec3 fdx=dFdx(vViewPosition);vec3 fdy=dFdy(vViewPosition);vec3 normal=normalize(cross(fdx,fdy));
#else
vec3 normal=normalize(vNormal);
#ifdef DOUBLE_SIDED
normal*=faceDirection;
#endif
#endif
#if defined(USE_NORMALMAP_TANGENTSPACE)||defined(USE_CLEARCOAT_NORMALMAP)||defined(USE_ANISOTROPY)
#ifdef USE_TANGENT
mat3 tbn=mat3(normalize(vTangent),normalize(vBitangent),normal);
#else
mat3 tbn=getTangentFrame(-vViewPosition,normal,
#if defined(USE_NORMALMAP)
vNormalMapUv
#elif defined(USE_CLEARCOAT_NORMALMAP)
vClearcoatNormalMapUv
#else
vUv
#endif
);
#endif
#if defined(DOUBLE_SIDED)&&!defined(FLAT_SHADED)
tbn[0]*=faceDirection;tbn[1]*=faceDirection;
#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
#ifdef USE_TANGENT
mat3 tbn2=mat3(normalize(vTangent),normalize(vBitangent),normal);
#else
mat3 tbn2=getTangentFrame(-vViewPosition,normal,vClearcoatNormalMapUv);
#endif
#if defined(DOUBLE_SIDED)&&!defined(FLAT_SHADED)
tbn2[0]*=faceDirection;tbn2[1]*=faceDirection;
#endif
#endif
vec3 geometryNormal=normal;`, i5 = `#ifdef USE_NORMALMAP_OBJECTSPACE
normal=texture2D(normalMap,vNormalMapUv).xyz*2.0-1.0;
#ifdef FLIP_SIDED
normal=-normal;
#endif
#ifdef DOUBLE_SIDED
normal=normal*faceDirection;
#endif
normal=normalize(normalMatrix*normal);
#elif defined(USE_NORMALMAP_TANGENTSPACE)
vec3 mapN=texture2D(normalMap,vNormalMapUv).xyz*2.0-1.0;mapN.xy*=normalScale;normal=normalize(tbn*mapN);
#elif defined(USE_BUMPMAP)
normal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd(),faceDirection);
#endif`, i6 = `#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;varying vec3 vBitangent;
#endif
#endif`, i8 = `#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;varying vec3 vBitangent;
#endif
#endif`, i7 = `#ifndef FLAT_SHADED
vNormal=normalize(transformedNormal);
#ifdef USE_TANGENT
vTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);
#endif
#endif`, i9 = `#ifdef USE_NORMALMAP
uniform sampler2D normalMap;uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
uniform mat3 normalMatrix;
#endif
#if !defined(USE_TANGENT)&&(defined(USE_NORMALMAP_TANGENTSPACE)||defined(USE_CLEARCOAT_NORMALMAP)||defined(USE_ANISOTROPY))
mat3 getTangentFrame(vec3 eye_pos,vec3 surf_norm,vec2 uv){vec3 q0=dFdx(eye_pos.xyz);vec3 q1=dFdy(eye_pos.xyz);vec2 st0=dFdx(uv.st);vec2 st1=dFdy(uv.st);vec3 N=surf_norm;vec3 q1perp=cross(q1,N);vec3 q0perp=cross(N,q0);vec3 T=q1perp*st0.x+q0perp*st1.x;vec3 B=q1perp*st0.y+q0perp*st1.y;float det=max(dot(T,T),dot(B,B));float scale=(det==0.0)?0.0:inversesqrt(det);return mat3(T*scale,B*scale,N);}
#endif`, re = `#ifdef USE_CLEARCOAT
vec3 clearcoatNormal=geometryNormal;
#endif`, rt = `#ifdef USE_CLEARCOAT_NORMALMAP
vec3 clearcoatMapN=texture2D(clearcoatNormalMap,vClearcoatNormalMapUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;clearcoatNormal=normalize(tbn2*clearcoatMapN);
#endif`, ri = `#ifdef USE_CLEARCOATMAP
uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform sampler2D clearcoatRoughnessMap;
#endif`, rr = `#ifdef USE_IRIDESCENCEMAP
uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform sampler2D iridescenceThicknessMap;
#endif`, ra = `#ifdef OPAQUE
diffuseColor.a=1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a*=material.transmissionAlpha;
#endif
gl_FragColor=vec4(outgoingLight,diffuseColor.a);`, rn = `#ifdef PREMULTIPLIED_ALPHA
gl_FragColor.rgb*=gl_FragColor.a;
#endif`, rs = `vec4 mvPosition=vec4(transformed,1.0);
#ifdef USE_INSTANCING
mvPosition=instanceMatrix*mvPosition;
#endif
mvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;`, ro = `#ifdef DITHERING
gl_FragColor.rgb=dithering(gl_FragColor.rgb);
#endif`, rl = `#ifdef DITHERING
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}
#endif`, rh = `float roughnessFactor=roughness;
#ifdef USE_ROUGHNESSMAP
vec4 texelRoughness=texture2D(roughnessMap,vRoughnessMapUv);roughnessFactor*=texelRoughness.g;
#endif`, rc = `#ifdef USE_ROUGHNESSMAP
uniform sampler2D roughnessMap;
#endif`, ru = `#if NUM_SPOT_LIGHT_COORDS>0
varying vec4 vSpotLightCoord[NUM_SPOT_LIGHT_COORDS];
#endif
#if NUM_SPOT_LIGHT_MAPS>0
uniform sampler2D spotLightMap[NUM_SPOT_LIGHT_MAPS];
#endif
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
uniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
uniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
uniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];
#endif
float texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bool inFrustum=shadowCoord.x>=0.0&&shadowCoord.x<=1.0&&shadowCoord.y>=0.0&&shadowCoord.y<=1.0;bool frustumTest=inFrustum&&shadowCoord.z<=1.0;if(frustumTest){
#if defined(SHADOWMAP_TYPE_PCF)
vec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);
#elif defined(SHADOWMAP_TYPE_PCF_SOFT)
vec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);
#elif defined(SHADOWMAP_TYPE_VSM)
shadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);
#else
shadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);
#endif
}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);
#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)
vec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);
#else
return texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);
#endif
}
#endif`, rd = `#if NUM_SPOT_LIGHT_COORDS>0
uniform mat4 spotLightMatrix[NUM_SPOT_LIGHT_COORDS];varying vec4 vSpotLightCoord[NUM_SPOT_LIGHT_COORDS];
#endif
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
uniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
uniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];
#endif
#endif`, rp = `#if (defined(USE_SHADOWMAP)&&(NUM_DIR_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0))||(NUM_SPOT_LIGHT_COORDS>0)
vec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;
#endif
#if defined(USE_SHADOWMAP)
#if NUM_DIR_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#endif
#if NUM_SPOT_LIGHT_COORDS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHT_COORDS;i++){shadowWorldPosition=worldPosition;
#if (defined(USE_SHADOWMAP)&&UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
shadowWorldPosition.xyz+=shadowWorldNormal*spotLightShadows[i].shadowNormalBias;
#endif
vSpotLightCoord[i]=spotLightMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif`, rf = `float getShadowMask(){float shadow=1.0;
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
DirectionalLightShadow directionalLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}
#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
SpotLightShadow spotLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotLightCoord[i]):1.0;}
#pragma unroll_loop_end
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
PointLightShadow pointLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}
#pragma unroll_loop_end
#endif
#endif
return shadow;}`, rm = `#ifdef USE_SKINNING
mat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);
#endif`, rg = `#ifdef USE_SKINNING
uniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;uniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}
#endif`, rv = `#ifdef USE_SKINNING
vec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;
#endif`, r_ = `#ifdef USE_SKINNING
mat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;
#ifdef USE_TANGENT
objectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;
#endif
#endif`, rx = `float specularStrength;
#ifdef USE_SPECULARMAP
vec4 texelSpecular=texture2D(specularMap,vSpecularMapUv);specularStrength=texelSpecular.r;
#else
specularStrength=1.0;
#endif`, ry = `#ifdef USE_SPECULARMAP
uniform sampler2D specularMap;
#endif`, rM = `#if defined(TONE_MAPPING)
gl_FragColor.rgb=toneMapping(gl_FragColor.rgb);
#endif`, rS = `#ifndef saturate
#define saturate(a)clamp(a,0.0,1.0)
#endif
uniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return saturate(toneMappingExposure*color);}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}`,
        rb = `#ifdef USE_TRANSMISSION
material.transmission=transmission;material.transmissionAlpha=1.0;material.thickness=thickness;material.attenuationDistance=attenuationDistance;material.attenuationColor=attenuationColor;
#ifdef USE_TRANSMISSIONMAP
material.transmission*=texture2D(transmissionMap,vTransmissionMapUv).r;
#endif
#ifdef USE_THICKNESSMAP
material.thickness*=texture2D(thicknessMap,vThicknessMapUv).g;
#endif
vec3 pos=vWorldPosition;vec3 v=normalize(cameraPosition-pos);vec3 n=inverseTransformDirection(normal,viewMatrix);vec4 transmitted=getIBLVolumeRefraction(n,v,material.roughness,material.diffuseColor,material.specularColor,material.specularF90,pos,modelMatrix,viewMatrix,projectionMatrix,material.ior,material.thickness,material.attenuationColor,material.attenuationDistance);material.transmissionAlpha=mix(material.transmissionAlpha,transmitted.a,material.transmission);totalDiffuse=mix(totalDiffuse,transmitted.rgb,material.transmission);
#endif`, rw = `#ifdef USE_TRANSMISSION
uniform float transmission;uniform float thickness;uniform float attenuationDistance;uniform vec3 attenuationColor;
#ifdef USE_TRANSMISSIONMAP
uniform sampler2D transmissionMap;
#endif
#ifdef USE_THICKNESSMAP
uniform sampler2D thicknessMap;
#endif
uniform vec2 transmissionSamplerSize;uniform sampler2D transmissionSamplerMap;uniform mat4 modelMatrix;uniform mat4 projectionMatrix;varying vec3 vWorldPosition;float w0(float a){return(1.0/6.0)*(a*(a*(-a+3.0)-3.0)+1.0);}float w1(float a){return(1.0/6.0)*(a*a*(3.0*a-6.0)+4.0);}float w2(float a){return(1.0/6.0)*(a*(a*(-3.0*a+3.0)+3.0)+1.0);}float w3(float a){return(1.0/6.0)*(a*a*a);}float g0(float a){return w0(a)+w1(a);}float g1(float a){return w2(a)+w3(a);}float h0(float a){return-1.0+w1(a)/(w0(a)+w1(a));}float h1(float a){return 1.0+w3(a)/(w2(a)+w3(a));}vec4 bicubic(sampler2D tex,vec2 uv,vec4 texelSize,float lod){uv=uv*texelSize.zw+0.5;vec2 iuv=floor(uv);vec2 fuv=fract(uv);float g0x=g0(fuv.x);float g1x=g1(fuv.x);float h0x=h0(fuv.x);float h1x=h1(fuv.x);float h0y=h0(fuv.y);float h1y=h1(fuv.y);vec2 p0=(vec2(iuv.x+h0x,iuv.y+h0y)-0.5)*texelSize.xy;vec2 p1=(vec2(iuv.x+h1x,iuv.y+h0y)-0.5)*texelSize.xy;vec2 p2=(vec2(iuv.x+h0x,iuv.y+h1y)-0.5)*texelSize.xy;vec2 p3=(vec2(iuv.x+h1x,iuv.y+h1y)-0.5)*texelSize.xy;return g0(fuv.y)*(g0x*textureLod(tex,p0,lod)+g1x*textureLod(tex,p1,lod))+g1(fuv.y)*(g0x*textureLod(tex,p2,lod)+g1x*textureLod(tex,p3,lod));}vec4 textureBicubic(sampler2D sampler,vec2 uv,float lod){vec2 fLodSize=vec2(textureSize(sampler,int(lod)));vec2 cLodSize=vec2(textureSize(sampler,int(lod+1.0)));vec2 fLodSizeInv=1.0/fLodSize;vec2 cLodSizeInv=1.0/cLodSize;vec4 fSample=bicubic(sampler,uv,vec4(fLodSizeInv,fLodSize),floor(lod));vec4 cSample=bicubic(sampler,uv,vec4(cLodSizeInv,cLodSize),ceil(lod));return mix(fSample,cSample,fract(lod));}vec3 getVolumeTransmissionRay(const in vec3 n,const in vec3 v,const in float thickness,const in float ior,const in mat4 modelMatrix){vec3 refractionVector=refract(-v,normalize(n),1.0/ior);vec3 modelScale;modelScale.x=length(vec3(modelMatrix[0].xyz));modelScale.y=length(vec3(modelMatrix[1].xyz));modelScale.z=length(vec3(modelMatrix[2].xyz));return normalize(refractionVector)*thickness*modelScale;}float applyIorToRoughness(const in float roughness,const in float ior){return roughness*clamp(ior*2.0-2.0,0.0,1.0);}vec4 getTransmissionSample(const in vec2 fragCoord,const in float roughness,const in float ior){float lod=log2(transmissionSamplerSize.x)*applyIorToRoughness(roughness,ior);return textureBicubic(transmissionSamplerMap,fragCoord.xy,lod);}vec3 volumeAttenuation(const in float transmissionDistance,const in vec3 attenuationColor,const in float attenuationDistance){if(isinf(attenuationDistance)){return vec3(1.0);}else{vec3 attenuationCoefficient=-log(attenuationColor)/attenuationDistance;vec3 transmittance=exp(-attenuationCoefficient*transmissionDistance);return transmittance;}}vec4 getIBLVolumeRefraction(const in vec3 n,const in vec3 v,const in float roughness,const in vec3 diffuseColor,const in vec3 specularColor,const in float specularF90,const in vec3 position,const in mat4 modelMatrix,const in mat4 viewMatrix,const in mat4 projMatrix,const in float ior,const in float thickness,const in vec3 attenuationColor,const in float attenuationDistance){vec3 transmissionRay=getVolumeTransmissionRay(n,v,thickness,ior,modelMatrix);vec3 refractedRayExit=position+transmissionRay;vec4 ndcPos=projMatrix*viewMatrix*vec4(refractedRayExit,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;vec4 transmittedLight=getTransmissionSample(refractionCoords,roughness,ior);vec3 transmittance=diffuseColor*volumeAttenuation(length(transmissionRay),attenuationColor,attenuationDistance);vec3 attenuatedColor=transmittance*transmittedLight.rgb;vec3 F=EnvironmentBRDF(n,v,specularColor,specularF90,roughness);float transmittanceFactor=(transmittance.r+transmittance.g+transmittance.b)/3.0;return vec4((1.0-F)*attenuatedColor,1.0-(1.0-transmittedLight.a)*transmittanceFactor);}
#endif`, rT = `#if defined(USE_UV)||defined(USE_ANISOTROPY)
varying vec2 vUv;
#endif
#ifdef USE_MAP
varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
uniform mat3 transmissionMapTransform;varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
uniform mat3 thicknessMapTransform;varying vec2 vThicknessMapUv;
#endif`, rE = `#if defined(USE_UV)||defined(USE_ANISOTROPY)
varying vec2 vUv;
#endif
#ifdef USE_MAP
uniform mat3 mapTransform;varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
uniform mat3 alphaMapTransform;varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
uniform mat3 lightMapTransform;varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
uniform mat3 aoMapTransform;varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
uniform mat3 bumpMapTransform;varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
uniform mat3 normalMapTransform;varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
uniform mat3 displacementMapTransform;varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
uniform mat3 emissiveMapTransform;varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
uniform mat3 metalnessMapTransform;varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
uniform mat3 roughnessMapTransform;varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
uniform mat3 anisotropyMapTransform;varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
uniform mat3 clearcoatMapTransform;varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform mat3 clearcoatNormalMapTransform;varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform mat3 clearcoatRoughnessMapTransform;varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
uniform mat3 sheenColorMapTransform;varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform mat3 sheenRoughnessMapTransform;varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
uniform mat3 iridescenceMapTransform;varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform mat3 iridescenceThicknessMapTransform;varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
uniform mat3 specularMapTransform;varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
uniform mat3 specularColorMapTransform;varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform mat3 specularIntensityMapTransform;varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
uniform mat3 transmissionMapTransform;varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
uniform mat3 thicknessMapTransform;varying vec2 vThicknessMapUv;
#endif`, rA = `#if defined(USE_UV)||defined(USE_ANISOTROPY)
vUv=vec3(uv,1).xy;
#endif
#ifdef USE_MAP
vMapUv=(mapTransform*vec3(MAP_UV,1)).xy;
#endif
#ifdef USE_ALPHAMAP
vAlphaMapUv=(alphaMapTransform*vec3(ALPHAMAP_UV,1)).xy;
#endif
#ifdef USE_LIGHTMAP
vLightMapUv=(lightMapTransform*vec3(LIGHTMAP_UV,1)).xy;
#endif
#ifdef USE_AOMAP
vAoMapUv=(aoMapTransform*vec3(AOMAP_UV,1)).xy;
#endif
#ifdef USE_BUMPMAP
vBumpMapUv=(bumpMapTransform*vec3(BUMPMAP_UV,1)).xy;
#endif
#ifdef USE_NORMALMAP
vNormalMapUv=(normalMapTransform*vec3(NORMALMAP_UV,1)).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
vDisplacementMapUv=(displacementMapTransform*vec3(DISPLACEMENTMAP_UV,1)).xy;
#endif
#ifdef USE_EMISSIVEMAP
vEmissiveMapUv=(emissiveMapTransform*vec3(EMISSIVEMAP_UV,1)).xy;
#endif
#ifdef USE_METALNESSMAP
vMetalnessMapUv=(metalnessMapTransform*vec3(METALNESSMAP_UV,1)).xy;
#endif
#ifdef USE_ROUGHNESSMAP
vRoughnessMapUv=(roughnessMapTransform*vec3(ROUGHNESSMAP_UV,1)).xy;
#endif
#ifdef USE_ANISOTROPYMAP
vAnisotropyMapUv=(anisotropyMapTransform*vec3(ANISOTROPYMAP_UV,1)).xy;
#endif
#ifdef USE_CLEARCOATMAP
vClearcoatMapUv=(clearcoatMapTransform*vec3(CLEARCOATMAP_UV,1)).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
vClearcoatNormalMapUv=(clearcoatNormalMapTransform*vec3(CLEARCOAT_NORMALMAP_UV,1)).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
vClearcoatRoughnessMapUv=(clearcoatRoughnessMapTransform*vec3(CLEARCOAT_ROUGHNESSMAP_UV,1)).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
vIridescenceMapUv=(iridescenceMapTransform*vec3(IRIDESCENCEMAP_UV,1)).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
vIridescenceThicknessMapUv=(iridescenceThicknessMapTransform*vec3(IRIDESCENCE_THICKNESSMAP_UV,1)).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
vSheenColorMapUv=(sheenColorMapTransform*vec3(SHEEN_COLORMAP_UV,1)).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
vSheenRoughnessMapUv=(sheenRoughnessMapTransform*vec3(SHEEN_ROUGHNESSMAP_UV,1)).xy;
#endif
#ifdef USE_SPECULARMAP
vSpecularMapUv=(specularMapTransform*vec3(SPECULARMAP_UV,1)).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
vSpecularColorMapUv=(specularColorMapTransform*vec3(SPECULAR_COLORMAP_UV,1)).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
vSpecularIntensityMapUv=(specularIntensityMapTransform*vec3(SPECULAR_INTENSITYMAP_UV,1)).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
vTransmissionMapUv=(transmissionMapTransform*vec3(TRANSMISSIONMAP_UV,1)).xy;
#endif
#ifdef USE_THICKNESSMAP
vThicknessMapUv=(thicknessMapTransform*vec3(THICKNESSMAP_UV,1)).xy;
#endif`, rC = `#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)||defined(USE_TRANSMISSION)||NUM_SPOT_LIGHT_COORDS>0
vec4 worldPosition=vec4(transformed,1.0);
#ifdef USE_INSTANCING
worldPosition=instanceMatrix*worldPosition;
#endif
worldPosition=modelMatrix*worldPosition;
#endif`;
    let rL = `uniform sampler2D t2D;uniform float backgroundIntensity;varying vec2 vUv;void main(){vec4 texColor=texture2D(t2D,vUv);
#ifdef DECODE_VIDEO_TEXTURE
texColor=vec4(mix(pow(texColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),texColor.rgb*0.0773993808,vec3(lessThanEqual(texColor.rgb,vec3(0.04045)))),texColor.w);
#endif
texColor.rgb*=backgroundIntensity;gl_FragColor=texColor;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`, rP = `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
gl_Position.z=gl_Position.w;}`, rR = `#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#elif defined(ENVMAP_TYPE_CUBE_UV)
uniform sampler2D envMap;
#endif
uniform float flipEnvMap;uniform float backgroundBlurriness;uniform float backgroundIntensity;varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main(){
#ifdef ENVMAP_TYPE_CUBE
vec4 texColor=textureCube(envMap,vec3(flipEnvMap*vWorldDirection.x,vWorldDirection.yz));
#elif defined(ENVMAP_TYPE_CUBE_UV)
vec4 texColor=textureCubeUV(envMap,vWorldDirection,backgroundBlurriness);
#else
vec4 texColor=vec4(0.0,0.0,0.0,1.0);
#endif
texColor.rgb*=backgroundIntensity;gl_FragColor=texColor;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`, rD = `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
gl_Position.z=gl_Position.w;}`, rU = `uniform samplerCube tCube;uniform float tFlip;uniform float opacity;varying vec3 vWorldDirection;void main(){vec4 texColor=textureCube(tCube,vec3(tFlip*vWorldDirection.x,vWorldDirection.yz));gl_FragColor=texColor;gl_FragColor.a*=opacity;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`, rI = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;void main(){
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vHighPrecisionZW=gl_Position.zw;}`, rN = `#if DEPTH_PACKING==3200
uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(1.0);
#if DEPTH_PACKING==3200
diffuseColor.a=opacity;
#endif
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <logdepthbuf_fragment>
float fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;
#if DEPTH_PACKING==3200
gl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);
#elif DEPTH_PACKING==3201
gl_FragColor=packDepthToRGBA(fragCoordZ);
#endif
}`, rO = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <worldpos_vertex>
#include <clipping_planes_vertex>
vWorldPosition=worldPosition.xyz;}`, rz = `#define DISTANCE
uniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(1.0);
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
float dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}`,
        rF = `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
}`, rB = `uniform sampler2D tEquirect;varying vec3 vWorldDirection;
#include <common>
void main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`, rk = `uniform float scale;attribute float lineDistance;varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){vLineDistance=scale*lineDistance;
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`, rH = `uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
if(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
outgoingLight=diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`, rV = `#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#if defined(USE_ENVMAP)||defined(USE_SKINNING)
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <envmap_vertex>
#include <fog_vertex>
}`, rG = `uniform vec3 diffuse;uniform float opacity;
#ifndef FLAT_SHADED
varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));
#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vLightMapUv);reflectedLight.indirectDiffuse+=lightMapTexel.rgb*lightMapIntensity*RECIPROCAL_PI;
#else
reflectedLight.indirectDiffuse+=vec3(1.0);
#endif
#include <aomap_fragment>
reflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`, rW = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`, rj = `#define LAMBERT
uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_lambert_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`, rq = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
vViewPosition=-mvPosition.xyz;}`, rX = `#define MATCAP
uniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
vec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;
#ifdef USE_MATCAP
vec4 matcapColor=texture2D(matcap,uv);
#else
vec4 matcapColor=vec4(vec3(mix(0.2,0.8,uv.y)),1.0);
#endif
vec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`, rY = `#define NORMAL
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(USE_NORMALMAP_TANGENTSPACE)
varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(USE_NORMALMAP_TANGENTSPACE)
vViewPosition=-mvPosition.xyz;
#endif
}`, rZ = `#define NORMAL
uniform float opacity;
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(USE_NORMALMAP_TANGENTSPACE)
varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
gl_FragColor=vec4(packNormalToRGB(normal),opacity);
#ifdef OPAQUE
gl_FragColor.a=1.0;
#endif
}`, rK = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`, rJ = `#define PHONG
uniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_phong_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`, rQ = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition=worldPosition.xyz;
#endif
}`, r$ = `#define STANDARD
#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif
uniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef USE_SPECULAR
uniform float specularIntensity;uniform vec3 specularColor;
#ifdef USE_SPECULAR_COLORMAP
uniform sampler2D specularColorMap;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;uniform float iridescenceIOR;uniform float iridescenceThicknessMinimum;uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;uniform float sheenRoughness;
#ifdef USE_SHEEN_COLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif
#ifdef USE_ANISOTROPY
uniform vec2 anisotropyVector;
#ifdef USE_ANISOTROPYMAP
uniform sampler2D anisotropyMap;
#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 totalDiffuse=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse;vec3 totalSpecular=reflectedLight.directSpecular+reflectedLight.indirectSpecular;
#include <transmission_fragment>
vec3 outgoingLight=totalDiffuse+totalSpecular+totalEmissiveRadiance;
#ifdef USE_SHEEN
float sheenEnergyComp=1.0-0.157*max3(material.sheenColor);outgoingLight=outgoingLight*sheenEnergyComp+sheenSpecular;
#endif
#ifdef USE_CLEARCOAT
float dotNVcc=saturate(dot(geometry.clearcoatNormal,geometry.viewDir));vec3 Fcc=F_Schlick(material.clearcoatF0,material.clearcoatF90,dotNVcc);outgoingLight=outgoingLight*(1.0-material.clearcoat*Fcc)+clearcoatSpecular*material.clearcoat;
#endif
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`, r0 = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`, r1 = `#define TOON
uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_toon_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`, r3 = `uniform float size;uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
varying vec2 vUv;uniform mat3 uvTransform;
#endif
void main(){
#ifdef USE_POINTS_UV
vUv=(uvTransform*vec3(uv,1)).xy;
#endif
#include <color_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
gl_PointSize=size;
#ifdef USE_SIZEATTENUATION
bool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);
#endif
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <fog_vertex>
}`, r2 = `uniform vec3 diffuse;uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_particle_fragment>
#include <color_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
outgoingLight=diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`, r4 = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main(){
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`, r5 = `uniform vec3 color;uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main(){
#include <logdepthbuf_fragment>
gl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
}`, r6 = `uniform float rotation;uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
vec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));
#ifndef USE_SIZEATTENUATION
bool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;
#endif
vec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`, r8 = `uniform vec3 diffuse;uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
outgoingLight=diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
}`, r7 = {
            alphahash_fragment: t2,
            alphahash_pars_fragment: t4,
            alphamap_fragment: t5,
            alphamap_pars_fragment: t6,
            alphatest_fragment: t8,
            alphatest_pars_fragment: t7,
            aomap_fragment: t9,
            aomap_pars_fragment: ie,
            begin_vertex: it,
            beginnormal_vertex: ii,
            bsdfs: "float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_BlinnPhong(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(lightDir+viewDir);float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(specularColor,1.0,dotVH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}",
            iridescence_fragment: ir,
            bumpmap_pars_fragment: ia,
            clipping_planes_fragment: is,
            clipping_planes_pars_fragment: io,
            clipping_planes_pars_vertex: il,
            clipping_planes_vertex: ih,
            color_fragment: ic,
            color_pars_fragment: iu,
            color_pars_vertex: id,
            color_vertex: ip,
            common: im,
            cube_uv_reflection_fragment: ig,
            defaultnormal_vertex: iv,
            displacementmap_pars_vertex: i_,
            displacementmap_vertex: ix,
            emissivemap_fragment: iy,
            emissivemap_pars_fragment: iM,
            colorspace_fragment: "gl_FragColor=linearToOutputTexel(gl_FragColor);",
            colorspace_pars_fragment: "vec4 LinearToLinear(in vec4 value){return value;}vec4 LinearTosRGB(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}",
            envmap_fragment: iS,
            envmap_common_pars_fragment: ib,
            envmap_pars_fragment: iw,
            envmap_pars_vertex: iT,
            envmap_physical_pars_fragment: iO,
            envmap_vertex: iE,
            fog_vertex: iA,
            fog_pars_vertex: iC,
            fog_fragment: iL,
            fog_pars_fragment: iP,
            gradientmap_pars_fragment: iR,
            lightmap_fragment: iD,
            lightmap_pars_fragment: iU,
            lights_lambert_fragment: "LambertMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularStrength=specularStrength;",
            lights_lambert_pars_fragment: iI,
            lights_pars_begin: iN,
            lights_toon_fragment: "ToonMaterial material;material.diffuseColor=diffuseColor.rgb;",
            lights_toon_pars_fragment: iz,
            lights_phong_fragment: "BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;",
            lights_phong_pars_fragment: iF,
            lights_physical_fragment: iB,
            lights_physical_pars_fragment: ik,
            lights_fragment_begin: iH,
            lights_fragment_maps: iV,
            lights_fragment_end: iG,
            logdepthbuf_fragment: iW,
            logdepthbuf_pars_fragment: ij,
            logdepthbuf_pars_vertex: iq,
            logdepthbuf_vertex: iX,
            map_fragment: iY,
            map_pars_fragment: iZ,
            map_particle_fragment: iK,
            map_particle_pars_fragment: iJ,
            metalnessmap_fragment: iQ,
            metalnessmap_pars_fragment: i$,
            morphcolor_vertex: i0,
            morphnormal_vertex: i1,
            morphtarget_pars_vertex: i3,
            morphtarget_vertex: i2,
            normal_fragment_begin: i4,
            normal_fragment_maps: i5,
            normal_pars_fragment: i6,
            normal_pars_vertex: i8,
            normal_vertex: i7,
            normalmap_pars_fragment: i9,
            clearcoat_normal_fragment_begin: re,
            clearcoat_normal_fragment_maps: rt,
            clearcoat_pars_fragment: ri,
            iridescence_pars_fragment: rr,
            opaque_fragment: ra,
            packing: "vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec2 packDepthToRG(in highp float v){return packDepthToRGBA(v).yx;}float unpackRGToDepth(const in highp vec2 v){return unpackRGBAToDepth(vec4(v.xy,0.0,0.0));}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float depth,const in float near,const in float far){return depth*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float depth,const in float near,const in float far){return(near*far)/((far-near)*depth-far);}",
            premultiplied_alpha_fragment: rn,
            project_vertex: rs,
            dithering_fragment: ro,
            dithering_pars_fragment: rl,
            roughnessmap_fragment: rh,
            roughnessmap_pars_fragment: rc,
            shadowmap_pars_fragment: ru,
            shadowmap_pars_vertex: rd,
            shadowmap_vertex: rp,
            shadowmask_pars_fragment: rf,
            skinbase_vertex: rm,
            skinning_pars_vertex: rg,
            skinning_vertex: rv,
            skinnormal_vertex: r_,
            specularmap_fragment: rx,
            specularmap_pars_fragment: ry,
            tonemapping_fragment: rM,
            tonemapping_pars_fragment: rS,
            transmission_fragment: rb,
            transmission_pars_fragment: rw,
            uv_pars_fragment: rT,
            uv_pars_vertex: rE,
            uv_vertex: rA,
            worldpos_vertex: rC,
            background_vert: "varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}",
            background_frag: rL,
            backgroundCube_vert: rP,
            backgroundCube_frag: rR,
            cube_vert: rD,
            cube_frag: rU,
            depth_vert: rI,
            depth_frag: rN,
            distanceRGBA_vert: rO,
            distanceRGBA_frag: rz,
            equirect_vert: rF,
            equirect_frag: rB,
            linedashed_vert: rk,
            linedashed_frag: rH,
            meshbasic_vert: rV,
            meshbasic_frag: rG,
            meshlambert_vert: rW,
            meshlambert_frag: rj,
            meshmatcap_vert: rq,
            meshmatcap_frag: rX,
            meshnormal_vert: rY,
            meshnormal_frag: rZ,
            meshphong_vert: rK,
            meshphong_frag: rJ,
            meshphysical_vert: rQ,
            meshphysical_frag: r$,
            meshtoon_vert: r0,
            meshtoon_frag: r1,
            points_vert: r3,
            points_frag: r2,
            shadow_vert: r4,
            shadow_frag: r5,
            sprite_vert: r6,
            sprite_frag: r8
        }, r9 = {
            common: {
                diffuse: {value: new te(16777215)},
                opacity: {value: 1},
                map: {value: null},
                mapTransform: {value: new y},
                alphaMap: {value: null},
                alphaMapTransform: {value: new y},
                alphaTest: {value: 0}
            },
            specularmap: {specularMap: {value: null}, specularMapTransform: {value: new y}},
            envmap: {
                envMap: {value: null},
                flipEnvMap: {value: -1},
                reflectivity: {value: 1},
                ior: {value: 1.5},
                refractionRatio: {value: .98}
            },
            aomap: {aoMap: {value: null}, aoMapIntensity: {value: 1}, aoMapTransform: {value: new y}},
            lightmap: {lightMap: {value: null}, lightMapIntensity: {value: 1}, lightMapTransform: {value: new y}},
            bumpmap: {bumpMap: {value: null}, bumpMapTransform: {value: new y}, bumpScale: {value: 1}},
            normalmap: {normalMap: {value: null}, normalMapTransform: {value: new y}, normalScale: {value: new x(1, 1)}},
            displacementmap: {
                displacementMap: {value: null},
                displacementMapTransform: {value: new y},
                displacementScale: {value: 1},
                displacementBias: {value: 0}
            },
            emissivemap: {emissiveMap: {value: null}, emissiveMapTransform: {value: new y}},
            metalnessmap: {metalnessMap: {value: null}, metalnessMapTransform: {value: new y}},
            roughnessmap: {roughnessMap: {value: null}, roughnessMapTransform: {value: new y}},
            gradientmap: {gradientMap: {value: null}},
            fog: {
                fogDensity: {value: 25e-5},
                fogNear: {value: 1},
                fogFar: {value: 2e3},
                fogColor: {value: new te(16777215)}
            },
            lights: {
                ambientLightColor: {value: []},
                lightProbe: {value: []},
                directionalLights: {value: [], properties: {direction: {}, color: {}}},
                directionalLightShadows: {
                    value: [],
                    properties: {shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}}
                },
                directionalShadowMap: {value: []},
                directionalShadowMatrix: {value: []},
                spotLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        direction: {},
                        distance: {},
                        coneCos: {},
                        penumbraCos: {},
                        decay: {}
                    }
                },
                spotLightShadows: {
                    value: [],
                    properties: {shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}}
                },
                spotLightMap: {value: []},
                spotShadowMap: {value: []},
                spotLightMatrix: {value: []},
                pointLights: {value: [], properties: {color: {}, position: {}, decay: {}, distance: {}}},
                pointLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {},
                        shadowCameraNear: {},
                        shadowCameraFar: {}
                    }
                },
                pointShadowMap: {value: []},
                pointShadowMatrix: {value: []},
                hemisphereLights: {value: [], properties: {direction: {}, skyColor: {}, groundColor: {}}},
                rectAreaLights: {value: [], properties: {color: {}, position: {}, width: {}, height: {}}},
                ltc_1: {value: null},
                ltc_2: {value: null}
            },
            points: {
                diffuse: {value: new te(16777215)},
                opacity: {value: 1},
                size: {value: 1},
                scale: {value: 1},
                map: {value: null},
                alphaMap: {value: null},
                alphaMapTransform: {value: new y},
                alphaTest: {value: 0},
                uvTransform: {value: new y}
            },
            sprite: {
                diffuse: {value: new te(16777215)},
                opacity: {value: 1},
                center: {value: new x(.5, .5)},
                rotation: {value: 0},
                map: {value: null},
                mapTransform: {value: new y},
                alphaMap: {value: null},
                alphaMapTransform: {value: new y},
                alphaTest: {value: 0}
            }
        }, ae = {
            basic: {
                uniforms: tF([r9.common, r9.specularmap, r9.envmap, r9.aomap, r9.lightmap, r9.fog]),
                vertexShader: r7.meshbasic_vert,
                fragmentShader: r7.meshbasic_frag
            },
            lambert: {
                uniforms: tF([r9.common, r9.specularmap, r9.envmap, r9.aomap, r9.lightmap, r9.emissivemap, r9.bumpmap, r9.normalmap, r9.displacementmap, r9.fog, r9.lights, {emissive: {value: new te(0)}}]),
                vertexShader: r7.meshlambert_vert,
                fragmentShader: r7.meshlambert_frag
            },
            phong: {
                uniforms: tF([r9.common, r9.specularmap, r9.envmap, r9.aomap, r9.lightmap, r9.emissivemap, r9.bumpmap, r9.normalmap, r9.displacementmap, r9.fog, r9.lights, {
                    emissive: {value: new te(0)},
                    specular: {value: new te(1118481)},
                    shininess: {value: 30}
                }]), vertexShader: r7.meshphong_vert, fragmentShader: r7.meshphong_frag
            },
            standard: {
                uniforms: tF([r9.common, r9.envmap, r9.aomap, r9.lightmap, r9.emissivemap, r9.bumpmap, r9.normalmap, r9.displacementmap, r9.roughnessmap, r9.metalnessmap, r9.fog, r9.lights, {
                    emissive: {value: new te(0)},
                    roughness: {value: 1},
                    metalness: {value: 0},
                    envMapIntensity: {value: 1}
                }]), vertexShader: r7.meshphysical_vert, fragmentShader: r7.meshphysical_frag
            },
            toon: {
                uniforms: tF([r9.common, r9.aomap, r9.lightmap, r9.emissivemap, r9.bumpmap, r9.normalmap, r9.displacementmap, r9.gradientmap, r9.fog, r9.lights, {emissive: {value: new te(0)}}]),
                vertexShader: r7.meshtoon_vert,
                fragmentShader: r7.meshtoon_frag
            },
            matcap: {
                uniforms: tF([r9.common, r9.bumpmap, r9.normalmap, r9.displacementmap, r9.fog, {matcap: {value: null}}]),
                vertexShader: r7.meshmatcap_vert,
                fragmentShader: r7.meshmatcap_frag
            },
            points: {uniforms: tF([r9.points, r9.fog]), vertexShader: r7.points_vert, fragmentShader: r7.points_frag},
            dashed: {
                uniforms: tF([r9.common, r9.fog, {scale: {value: 1}, dashSize: {value: 1}, totalSize: {value: 2}}]),
                vertexShader: r7.linedashed_vert,
                fragmentShader: r7.linedashed_frag
            },
            depth: {
                uniforms: tF([r9.common, r9.displacementmap]),
                vertexShader: r7.depth_vert,
                fragmentShader: r7.depth_frag
            },
            normal: {
                uniforms: tF([r9.common, r9.bumpmap, r9.normalmap, r9.displacementmap, {opacity: {value: 1}}]),
                vertexShader: r7.meshnormal_vert,
                fragmentShader: r7.meshnormal_frag
            },
            sprite: {uniforms: tF([r9.sprite, r9.fog]), vertexShader: r7.sprite_vert, fragmentShader: r7.sprite_frag},
            background: {
                uniforms: {uvTransform: {value: new y}, t2D: {value: null}, backgroundIntensity: {value: 1}},
                vertexShader: r7.background_vert,
                fragmentShader: r7.background_frag
            },
            backgroundCube: {
                uniforms: {
                    envMap: {value: null},
                    flipEnvMap: {value: -1},
                    backgroundBlurriness: {value: 0},
                    backgroundIntensity: {value: 1}
                }, vertexShader: r7.backgroundCube_vert, fragmentShader: r7.backgroundCube_frag
            },
            cube: {
                uniforms: {tCube: {value: null}, tFlip: {value: -1}, opacity: {value: 1}},
                vertexShader: r7.cube_vert,
                fragmentShader: r7.cube_frag
            },
            equirect: {
                uniforms: {tEquirect: {value: null}},
                vertexShader: r7.equirect_vert,
                fragmentShader: r7.equirect_frag
            },
            distanceRGBA: {
                uniforms: tF([r9.common, r9.displacementmap, {
                    referencePosition: {value: new W},
                    nearDistance: {value: 1},
                    farDistance: {value: 1e3}
                }]), vertexShader: r7.distanceRGBA_vert, fragmentShader: r7.distanceRGBA_frag
            },
            shadow: {
                uniforms: tF([r9.lights, r9.fog, {color: {value: new te(0)}, opacity: {value: 1}}]),
                vertexShader: r7.shadow_vert,
                fragmentShader: r7.shadow_frag
            }
        };
    ae.physical = {
        uniforms: tF([ae.standard.uniforms, {
            clearcoat: {value: 0},
            clearcoatMap: {value: null},
            clearcoatMapTransform: {value: new y},
            clearcoatNormalMap: {value: null},
            clearcoatNormalMapTransform: {value: new y},
            clearcoatNormalScale: {value: new x(1, 1)},
            clearcoatRoughness: {value: 0},
            clearcoatRoughnessMap: {value: null},
            clearcoatRoughnessMapTransform: {value: new y},
            iridescence: {value: 0},
            iridescenceMap: {value: null},
            iridescenceMapTransform: {value: new y},
            iridescenceIOR: {value: 1.3},
            iridescenceThicknessMinimum: {value: 100},
            iridescenceThicknessMaximum: {value: 400},
            iridescenceThicknessMap: {value: null},
            iridescenceThicknessMapTransform: {value: new y},
            sheen: {value: 0},
            sheenColor: {value: new te(0)},
            sheenColorMap: {value: null},
            sheenColorMapTransform: {value: new y},
            sheenRoughness: {value: 1},
            sheenRoughnessMap: {value: null},
            sheenRoughnessMapTransform: {value: new y},
            transmission: {value: 0},
            transmissionMap: {value: null},
            transmissionMapTransform: {value: new y},
            transmissionSamplerSize: {value: new x},
            transmissionSamplerMap: {value: null},
            thickness: {value: 0},
            thicknessMap: {value: null},
            thicknessMapTransform: {value: new y},
            attenuationDistance: {value: 0},
            attenuationColor: {value: new te(0)},
            specularColor: {value: new te(1, 1, 1)},
            specularColorMap: {value: null},
            specularColorMapTransform: {value: new y},
            specularIntensity: {value: 1},
            specularIntensityMap: {value: null},
            specularIntensityMapTransform: {value: new y},
            anisotropyVector: {value: new x},
            anisotropyMap: {value: null},
            anisotropyMapTransform: {value: new y}
        }]), vertexShader: r7.meshphysical_vert, fragmentShader: r7.meshphysical_frag
    };
    let at = {r: 0, b: 0, g: 0};

    function ai(e, t, i, r, a, s, o) {
        let l, h;
        let c = new te(0), u = !0 === s ? 0 : 1, d = null, p = 0, f = null;

        function m(t, i) {
            t.getRGB(at, tB(e)), r.buffers.color.setClear(at.r, at.g, at.b, i, o)
        }

        return {
            getClearColor: function () {
                return c
            }, setClearColor: function (e, t = 1) {
                c.set(e), m(c, u = t)
            }, getClearAlpha: function () {
                return u
            }, setClearAlpha: function (e) {
                m(c, u = e)
            }, render: function (s, g) {
                let v = !1, _ = !0 === g.isScene ? g.background : null;
                if (_ && _.isTexture) {
                    let e = g.backgroundBlurriness > 0;
                    _ = (e ? i : t).get(_)
                }
                null === _ ? m(c, u) : _ && _.isColor && (m(_, 1), v = !0);
                let x = e.xr.getEnvironmentBlendMode();
                "additive" === x ? r.buffers.color.setClear(0, 0, 0, 1, o) : "alpha-blend" === x && r.buffers.color.setClear(0, 0, 0, 0, o), (e.autoClear || v) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), _ && (_.isCubeTexture || 306 === _.mapping) ? (void 0 === h && ((h = new tI(new tO(1, 1, 1), new tH({
                    name: "BackgroundCubeMaterial",
                    uniforms: tz(ae.backgroundCube.uniforms),
                    vertexShader: ae.backgroundCube.vertexShader,
                    fragmentShader: ae.backgroundCube.fragmentShader,
                    side: 1,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                }))).geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function (e, t, i) {
                    this.matrixWorld.copyPosition(i.matrixWorld)
                }, Object.defineProperty(h.material, "envMap", {
                    get: function () {
                        return this.uniforms.envMap.value
                    }
                }), a.update(h)), h.material.uniforms.envMap.value = _, h.material.uniforms.flipEnvMap.value = _.isCubeTexture && !1 === _.isRenderTargetTexture ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = g.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = g.backgroundIntensity, h.material.toneMapped = _.colorSpace !== n, (d !== _ || p !== _.version || f !== e.toneMapping) && (h.material.needsUpdate = !0, d = _, p = _.version, f = e.toneMapping), h.layers.enableAll(), s.unshift(h, h.geometry, h.material, 0, 0, null)) : _ && _.isTexture && (void 0 === l && ((l = new tI(new t3(2, 2), new tH({
                    name: "BackgroundMaterial",
                    uniforms: tz(ae.background.uniforms),
                    vertexShader: ae.background.vertexShader,
                    fragmentShader: ae.background.fragmentShader,
                    side: 0,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                }))).geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
                    get: function () {
                        return this.uniforms.t2D.value
                    }
                }), a.update(l)), l.material.uniforms.t2D.value = _, l.material.uniforms.backgroundIntensity.value = g.backgroundIntensity, l.material.toneMapped = _.colorSpace !== n, !0 === _.matrixAutoUpdate && _.updateMatrix(), l.material.uniforms.uvTransform.value.copy(_.matrix), (d !== _ || p !== _.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, d = _, p = _.version, f = e.toneMapping), l.layers.enableAll(), s.unshift(l, l.geometry, l.material, 0, 0, null))
            }
        }
    }

    function ar(e, t, i, r) {
        let a = e.getParameter(34921), n = r.isWebGL2 ? null : t.get("OES_vertex_array_object"),
            s = r.isWebGL2 || null !== n, o = {}, l = p(null), h = l, c = !1;

        function u(t) {
            return r.isWebGL2 ? e.bindVertexArray(t) : n.bindVertexArrayOES(t)
        }

        function d(t) {
            return r.isWebGL2 ? e.deleteVertexArray(t) : n.deleteVertexArrayOES(t)
        }

        function p(e) {
            let t = [], i = [], r = [];
            for (let e = 0; e < a; e++) t[e] = 0, i[e] = 0, r[e] = 0;
            return {
                geometry: null,
                program: null,
                wireframe: !1,
                newAttributes: t,
                enabledAttributes: i,
                attributeDivisors: r,
                object: e,
                attributes: {},
                index: null
            }
        }

        function f() {
            let e = h.newAttributes;
            for (let t = 0, i = e.length; t < i; t++) e[t] = 0
        }

        function m(e) {
            g(e, 0)
        }

        function g(i, a) {
            let n = h.newAttributes, s = h.enabledAttributes, o = h.attributeDivisors;
            if (n[i] = 1, 0 === s[i] && (e.enableVertexAttribArray(i), s[i] = 1), o[i] !== a) {
                let n = r.isWebGL2 ? e : t.get("ANGLE_instanced_arrays");
                n[r.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](i, a), o[i] = a
            }
        }

        function v() {
            let t = h.newAttributes, i = h.enabledAttributes;
            for (let r = 0, a = i.length; r < a; r++) i[r] !== t[r] && (e.disableVertexAttribArray(r), i[r] = 0)
        }

        function _(t, i, r, a, n, s, o) {
            !0 === o ? e.vertexAttribIPointer(t, i, r, n, s) : e.vertexAttribPointer(t, i, r, a, n, s)
        }

        function x() {
            y(), c = !0, h !== l && u((h = l).object)
        }

        function y() {
            l.geometry = null, l.program = null, l.wireframe = !1
        }

        return {
            setup: function (a, l, d, x, y) {
                let M = !1;
                if (s) {
                    let t = function (t, i, a) {
                        let s = !0 === a.wireframe, l = o[t.id];
                        void 0 === l && (l = {}, o[t.id] = l);
                        let h = l[i.id];
                        void 0 === h && (h = {}, l[i.id] = h);
                        let c = h[s];
                        return void 0 === c && (c = p(r.isWebGL2 ? e.createVertexArray() : n.createVertexArrayOES()), h[s] = c), c
                    }(x, d, l);
                    h !== t && u((h = t).object), (M = function (e, t, i, r) {
                        let a = h.attributes, n = t.attributes, s = 0, o = i.getAttributes();
                        for (let t in o) {
                            let i = o[t];
                            if (i.location >= 0) {
                                let i = a[t], r = n[t];
                                if (void 0 === r && ("instanceMatrix" === t && e.instanceMatrix && (r = e.instanceMatrix), "instanceColor" === t && e.instanceColor && (r = e.instanceColor)), void 0 === i || i.attribute !== r || r && i.data !== r.data) return !0;
                                s++
                            }
                        }
                        return h.attributesNum !== s || h.index !== r
                    }(a, x, d, y)) && function (e, t, i, r) {
                        let a = {}, n = t.attributes, s = 0, o = i.getAttributes();
                        for (let t in o) {
                            let i = o[t];
                            if (i.location >= 0) {
                                let i = n[t];
                                void 0 === i && ("instanceMatrix" === t && e.instanceMatrix && (i = e.instanceMatrix), "instanceColor" === t && e.instanceColor && (i = e.instanceColor));
                                let r = {};
                                r.attribute = i, i && i.data && (r.data = i.data), a[t] = r, s++
                            }
                        }
                        h.attributes = a, h.attributesNum = s, h.index = r
                    }(a, x, d, y)
                } else {
                    let e = !0 === l.wireframe;
                    (h.geometry !== x.id || h.program !== d.id || h.wireframe !== e) && (h.geometry = x.id, h.program = d.id, h.wireframe = e, M = !0)
                }
                null !== y && i.update(y, 34963), (M || c) && (c = !1, function (a, n, s, o) {
                    if (!1 === r.isWebGL2 && (a.isInstancedMesh || o.isInstancedBufferGeometry) && null === t.get("ANGLE_instanced_arrays")) return;
                    f();
                    let l = o.attributes, h = s.getAttributes(), c = n.defaultAttributeValues;
                    for (let t in h) {
                        let n = h[t];
                        if (n.location >= 0) {
                            let s = l[t];
                            if (void 0 === s && ("instanceMatrix" === t && a.instanceMatrix && (s = a.instanceMatrix), "instanceColor" === t && a.instanceColor && (s = a.instanceColor)), void 0 !== s) {
                                let t = s.normalized, l = s.itemSize, h = i.get(s);
                                if (void 0 === h) continue;
                                let c = h.buffer, u = h.type, d = h.bytesPerElement,
                                    p = !0 === r.isWebGL2 && (5124 === u || 5125 === u || 1013 === s.gpuType);
                                if (s.isInterleavedBufferAttribute) {
                                    let i = s.data, r = i.stride, h = s.offset;
                                    if (i.isInstancedInterleavedBuffer) {
                                        for (let e = 0; e < n.locationSize; e++) g(n.location + e, i.meshPerAttribute);
                                        !0 !== a.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = i.meshPerAttribute * i.count)
                                    } else for (let e = 0; e < n.locationSize; e++) m(n.location + e);
                                    e.bindBuffer(34962, c);
                                    for (let e = 0; e < n.locationSize; e++) _(n.location + e, l / n.locationSize, u, t, r * d, (h + l / n.locationSize * e) * d, p)
                                } else {
                                    if (s.isInstancedBufferAttribute) {
                                        for (let e = 0; e < n.locationSize; e++) g(n.location + e, s.meshPerAttribute);
                                        !0 !== a.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = s.meshPerAttribute * s.count)
                                    } else for (let e = 0; e < n.locationSize; e++) m(n.location + e);
                                    e.bindBuffer(34962, c);
                                    for (let e = 0; e < n.locationSize; e++) _(n.location + e, l / n.locationSize, u, t, l * d, l / n.locationSize * e * d, p)
                                }
                            } else if (void 0 !== c) {
                                let i = c[t];
                                if (void 0 !== i) switch (i.length) {
                                    case 2:
                                        e.vertexAttrib2fv(n.location, i);
                                        break;
                                    case 3:
                                        e.vertexAttrib3fv(n.location, i);
                                        break;
                                    case 4:
                                        e.vertexAttrib4fv(n.location, i);
                                        break;
                                    default:
                                        e.vertexAttrib1fv(n.location, i)
                                }
                            }
                        }
                    }
                    v()
                }(a, l, d, x), null !== y && e.bindBuffer(34963, i.get(y).buffer))
            }, reset: x, resetDefaultState: y, dispose: function () {
                for (let e in x(), o) {
                    let t = o[e];
                    for (let e in t) {
                        let i = t[e];
                        for (let e in i) d(i[e].object), delete i[e];
                        delete t[e]
                    }
                    delete o[e]
                }
            }, releaseStatesOfGeometry: function (e) {
                if (void 0 === o[e.id]) return;
                let t = o[e.id];
                for (let e in t) {
                    let i = t[e];
                    for (let e in i) d(i[e].object), delete i[e];
                    delete t[e]
                }
                delete o[e.id]
            }, releaseStatesOfProgram: function (e) {
                for (let t in o) {
                    let i = o[t];
                    if (void 0 === i[e.id]) continue;
                    let r = i[e.id];
                    for (let e in r) d(r[e].object), delete r[e];
                    delete i[e.id]
                }
            }, initAttributes: f, enableAttribute: m, disableUnusedAttributes: v
        }
    }

    function aa(e, t, i, r) {
        let a;
        let n = r.isWebGL2;
        this.setMode = function (e) {
            a = e
        }, this.render = function (t, r) {
            e.drawArrays(a, t, r), i.update(r, a, 1)
        }, this.renderInstances = function (r, s, o) {
            let l, h;
            if (0 !== o) {
                if (n) l = e, h = "drawArraysInstanced"; else if (l = t.get("ANGLE_instanced_arrays"), h = "drawArraysInstancedANGLE", null === l) {
                    console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                    return
                }
                l[h](a, r, s, o), i.update(s, a, o)
            }
        }
    }

    function an(e, t, i) {
        let r;

        function a(t) {
            if ("highp" === t) {
                if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
                t = "mediump"
            }
            return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
        }

        let n = "undefined" != typeof WebGL2RenderingContext && "WebGL2RenderingContext" === e.constructor.name,
            s = void 0 !== i.precision ? i.precision : "highp", o = a(s);
        o !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", o, "instead."), s = o);
        let l = n || t.has("WEBGL_draw_buffers"), h = !0 === i.logarithmicDepthBuffer, c = e.getParameter(34930),
            u = e.getParameter(35660), d = e.getParameter(3379), p = e.getParameter(34076), f = e.getParameter(34921),
            m = e.getParameter(36347), g = e.getParameter(36348), v = e.getParameter(36349), _ = u > 0,
            x = n || t.has("OES_texture_float"), y = n ? e.getParameter(36183) : 0;
        return {
            isWebGL2: n,
            drawBuffers: l,
            getMaxAnisotropy: function () {
                if (void 0 !== r) return r;
                if (!0 === t.has("EXT_texture_filter_anisotropic")) {
                    let i = t.get("EXT_texture_filter_anisotropic");
                    r = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                } else r = 0;
                return r
            },
            getMaxPrecision: a,
            precision: s,
            logarithmicDepthBuffer: h,
            maxTextures: c,
            maxVertexTextures: u,
            maxTextureSize: d,
            maxCubemapSize: p,
            maxAttributes: f,
            maxVertexUniforms: m,
            maxVaryings: g,
            maxFragmentUniforms: v,
            vertexTextures: _,
            floatFragmentTextures: x,
            floatVertexTextures: _ && x,
            maxSamples: y
        }
    }

    function as(e) {
        let t = this, i = null, r = 0, a = !1, n = !1, s = new tK, o = new y, l = {value: null, needsUpdate: !1};

        function h(e, i, r, a) {
            let n = null !== e ? e.length : 0, h = null;
            if (0 !== n) {
                if (h = l.value, !0 !== a || null === h) {
                    let t = r + 4 * n, a = i.matrixWorldInverse;
                    o.getNormalMatrix(a), (null === h || h.length < t) && (h = new Float32Array(t));
                    for (let t = 0, i = r; t !== n; ++t, i += 4) s.copy(e[t]).applyMatrix4(a, o), s.normal.toArray(h, i), h[i + 3] = s.constant
                }
                l.value = h, l.needsUpdate = !0
            }
            return t.numPlanes = n, t.numIntersection = 0, h
        }

        this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, t) {
            let i = 0 !== e.length || t || 0 !== r || a;
            return a = t, r = e.length, i
        }, this.beginShadows = function () {
            n = !0, h(null)
        }, this.endShadows = function () {
            n = !1
        }, this.setGlobalState = function (e, t) {
            i = h(e, t, 0)
        }, this.setState = function (s, o, c) {
            let u = s.clippingPlanes, d = s.clipIntersection, p = s.clipShadows, f = e.get(s);
            if (a && null !== u && 0 !== u.length && (!n || p)) {
                let e = n ? 0 : r, t = 4 * e, a = f.clippingState || null;
                l.value = a, a = h(u, o, t, c);
                for (let e = 0; e !== t; ++e) a[e] = i[e];
                f.clippingState = a, this.numIntersection = d ? this.numPlanes : 0, this.numPlanes += e
            } else n ? h(null) : (l.value !== i && (l.value = i, l.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0)
        }
    }

    function ao(e) {
        let t = new WeakMap;

        function i(e, t) {
            return 303 === t ? e.mapping = 301 : 304 === t && (e.mapping = 302), e
        }

        function r(e) {
            let i = e.target;
            i.removeEventListener("dispose", r);
            let a = t.get(i);
            void 0 !== a && (t.delete(i), a.dispose())
        }

        return {
            get: function (a) {
                if (a && a.isTexture && !1 === a.isRenderTargetTexture) {
                    let n = a.mapping;
                    if (303 === n || 304 === n) {
                        if (t.has(a)) {
                            let e = t.get(a).texture;
                            return i(e, a.mapping)
                        }
                        {
                            let n = a.image;
                            if (!n || !(n.height > 0)) return null;
                            {
                                let s = new tq(n.height / 2);
                                return s.fromEquirectangularTexture(e, a), t.set(a, s), a.addEventListener("dispose", r), i(s.texture, a.mapping)
                            }
                        }
                    }
                }
                return a
            }, dispose: function () {
                t = new WeakMap
            }
        }
    }

    class al extends tV {
        constructor(e = -1, t = 1, i = 1, r = -1, a = .1, n = 2e3) {
            super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = r, this.near = a, this.far = n, this.updateProjectionMatrix()
        }

        copy(e, t) {
            return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = null === e.view ? null : Object.assign({}, e.view), this
        }

        setViewOffset(e, t, i, r, a, n) {
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = r, this.view.width = a, this.view.height = n, this.updateProjectionMatrix()
        }

        clearViewOffset() {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
        }

        updateProjectionMatrix() {
            let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom),
                i = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, a = i - e, n = i + e, s = r + t,
                o = r - t;
            if (null !== this.view && this.view.enabled) {
                let e = (this.right - this.left) / this.view.fullWidth / this.zoom,
                    t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                a += e * this.view.offsetX, n = a + e * this.view.width, s -= t * this.view.offsetY, o = s - t * this.view.height
            }
            this.projectionMatrix.makeOrthographic(a, n, s, o, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }

        toJSON(e) {
            let t = super.toJSON(e);
            return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, null !== this.view && (t.object.view = Object.assign({}, this.view)), t
        }
    }

    let ah = [.125, .215, .35, .446, .526, .582], ac = new al, au = new te, ad = null, ap = (1 + Math.sqrt(5)) / 2,
        af = 1 / ap,
        am = [new W(1, 1, 1), new W(-1, 1, 1), new W(1, 1, -1), new W(-1, 1, -1), new W(0, ap, af), new W(0, ap, -af), new W(af, 0, ap), new W(-af, 0, ap), new W(ap, af, 0), new W(-ap, af, 0)];

    class ag {
        constructor(e) {
            this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial)
        }

        fromScene(e, t = 0, i = .1, r = 100) {
            ad = this._renderer.getRenderTarget(), this._setSize(256);
            let a = this._allocateTargets();
            return a.depthBuffer = !0, this._sceneToCubeUV(e, i, r, a), t > 0 && this._blur(a, 0, 0, t), this._applyPMREM(a), this._cleanup(a), a
        }

        fromEquirectangular(e, t = null) {
            return this._fromTexture(e, t)
        }

        fromCubemap(e, t = null) {
            return this._fromTexture(e, t)
        }

        compileCubemapShader() {
            null === this._cubemapMaterial && (this._cubemapMaterial = ay(), this._compileMaterial(this._cubemapMaterial))
        }

        compileEquirectangularShader() {
            null === this._equirectMaterial && (this._equirectMaterial = ax(), this._compileMaterial(this._equirectMaterial))
        }

        dispose() {
            this._dispose(), null !== this._cubemapMaterial && this._cubemapMaterial.dispose(), null !== this._equirectMaterial && this._equirectMaterial.dispose()
        }

        _setSize(e) {
            this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax)
        }

        _dispose() {
            null !== this._blurMaterial && this._blurMaterial.dispose(), null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
            for (let e = 0; e < this._lodPlanes.length; e++) this._lodPlanes[e].dispose()
        }

        _cleanup(e) {
            this._renderer.setRenderTarget(ad), e.scissorTest = !1, a_(e, 0, 0, e.width, e.height)
        }

        _fromTexture(e, t) {
            301 === e.mapping || 302 === e.mapping ? this._setSize(0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), ad = this._renderer.getRenderTarget();
            let i = t || this._allocateTargets();
            return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i
        }

        _allocateTargets() {
            let e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
                magFilter: 1006,
                minFilter: 1006,
                generateMipmaps: !1,
                type: 1016,
                format: 1023,
                colorSpace: s,
                depthBuffer: !1
            }, r = av(e, t, i);
            if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
                null !== this._pingPongRenderTarget && this._dispose(), this._pingPongRenderTarget = av(e, t, i);
                let {_lodMax: r} = this;
                ({sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas} = function (e) {
                    let t = [], i = [], r = [], a = e, n = e - 4 + 1 + ah.length;
                    for (let s = 0; s < n; s++) {
                        let n = Math.pow(2, a);
                        i.push(n);
                        let o = 1 / n;
                        s > e - 4 ? o = ah[s - e + 4 - 1] : 0 === s && (o = 0), r.push(o);
                        let l = 1 / (n - 2), h = -l, c = 1 + l, u = [h, h, c, h, c, c, h, h, c, c, h, c],
                            d = new Float32Array(108), p = new Float32Array(72), f = new Float32Array(36);
                        for (let e = 0; e < 6; e++) {
                            let t = e % 3 * 2 / 3 - 1, i = e > 2 ? 0 : -1,
                                r = [t, i, 0, t + 2 / 3, i, 0, t + 2 / 3, i + 1, 0, t, i, 0, t + 2 / 3, i + 1, 0, t, i + 1, 0];
                            d.set(r, 18 * e), p.set(u, 12 * e);
                            let a = [e, e, e, e, e, e];
                            f.set(a, 6 * e)
                        }
                        let m = new tg;
                        m.setAttribute("position", new tn(d, 3)), m.setAttribute("uv", new tn(p, 2)), m.setAttribute("faceIndex", new tn(f, 1)), t.push(m), a > 4 && a--
                    }
                    return {lodPlanes: t, sizeLods: i, sigmas: r}
                }(r)), this._blurMaterial = function (e, t, i) {
                    let r = new Float32Array(20), a = new W(0, 1, 0), n = new tH({
                        name: "SphericalGaussianBlur",
                        defines: {
                            n: 20,
                            CUBEUV_TEXEL_WIDTH: 1 / t,
                            CUBEUV_TEXEL_HEIGHT: 1 / i,
                            CUBEUV_MAX_MIP: `${e}.0`
                        },
                        uniforms: {
                            envMap: {value: null},
                            samples: {value: 1},
                            weights: {value: r},
                            latitudinal: {value: !1},
                            dTheta: {value: 0},
                            mipInt: {value: 0},
                            poleAxis: {value: a}
                        },
                        vertexShader: aM(),
                        fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;uniform int samples;uniform float weights[n];uniform bool latitudinal;uniform float dTheta;uniform float mipInt;uniform vec3 poleAxis;
#define ENVMAP_TYPE_CUBE_UV
#include <cube_uv_reflection_fragment>
vec3 getSample(float theta,vec3 axis){float cosTheta=cos(theta);vec3 sampleDirection=vOutputDirection*cosTheta+cross(axis,vOutputDirection)*sin(theta)+axis*dot(axis,vOutputDirection)*(1.0-cosTheta);return bilinearCubeUV(envMap,sampleDirection,mipInt);}void main(){vec3 axis=latitudinal?poleAxis:cross(poleAxis,vOutputDirection);if(all(equal(axis,vec3(0.0)))){axis=vec3(vOutputDirection.z,0.0,-vOutputDirection.x);}axis=normalize(axis);gl_FragColor=vec4(0.0,0.0,0.0,1.0);gl_FragColor.rgb+=weights[0]*getSample(0.0,axis);for(int i=1;i<n;i++){if(i>=samples){break;}float theta=dTheta*float(i);gl_FragColor.rgb+=weights[i]*getSample(-1.0*theta,axis);gl_FragColor.rgb+=weights[i]*getSample(theta,axis);}}`,
                        blending: 0,
                        depthTest: !1,
                        depthWrite: !1
                    });
                    return n
                }(r, e, t)
            }
            return r
        }

        _compileMaterial(e) {
            let t = new tI(this._lodPlanes[0], e);
            this._renderer.compile(t, ac)
        }

        _sceneToCubeUV(e, t, i, r) {
            let a = new tG(90, 1, t, i), n = [1, -1, 1, 1, 1, 1], s = [1, 1, 1, -1, -1, -1], o = this._renderer,
                l = o.autoClear, h = o.toneMapping;
            o.getClearColor(au), o.toneMapping = 0, o.autoClear = !1;
            let c = new ti({name: "PMREM.Background", side: 1, depthWrite: !1, depthTest: !1}), u = new tI(new tO, c),
                d = !1, p = e.background;
            p ? p.isColor && (c.color.copy(p), e.background = null, d = !0) : (c.color.copy(au), d = !0);
            for (let t = 0; t < 6; t++) {
                let i = t % 3;
                0 === i ? (a.up.set(0, n[t], 0), a.lookAt(s[t], 0, 0)) : 1 === i ? (a.up.set(0, 0, n[t]), a.lookAt(0, s[t], 0)) : (a.up.set(0, n[t], 0), a.lookAt(0, 0, s[t]));
                let l = this._cubeSize;
                a_(r, i * l, t > 2 ? l : 0, l, l), o.setRenderTarget(r), d && o.render(u, a), o.render(e, a)
            }
            u.geometry.dispose(), u.material.dispose(), o.toneMapping = h, o.autoClear = l, e.background = p
        }

        _textureToCubeUV(e, t) {
            let i = this._renderer, r = 301 === e.mapping || 302 === e.mapping;
            r ? (null === this._cubemapMaterial && (this._cubemapMaterial = ay()), this._cubemapMaterial.uniforms.flipEnvMap.value = !1 === e.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = ax());
            let a = r ? this._cubemapMaterial : this._equirectMaterial, n = new tI(this._lodPlanes[0], a),
                s = a.uniforms;
            s.envMap.value = e;
            let o = this._cubeSize;
            a_(t, 0, 0, 3 * o, 2 * o), i.setRenderTarget(t), i.render(n, ac)
        }

        _applyPMREM(e) {
            let t = this._renderer, i = t.autoClear;
            t.autoClear = !1;
            for (let t = 1; t < this._lodPlanes.length; t++) {
                let i = Math.sqrt(this._sigmas[t] * this._sigmas[t] - this._sigmas[t - 1] * this._sigmas[t - 1]),
                    r = am[(t - 1) % am.length];
                this._blur(e, t - 1, t, i, r)
            }
            t.autoClear = i
        }

        _blur(e, t, i, r, a) {
            let n = this._pingPongRenderTarget;
            this._halfBlur(e, n, t, i, r, "latitudinal", a), this._halfBlur(n, e, i, i, r, "longitudinal", a)
        }

        _halfBlur(e, t, i, r, a, n, s) {
            let o = this._renderer, l = this._blurMaterial;
            "latitudinal" !== n && "longitudinal" !== n && console.error("blur direction must be either latitudinal or longitudinal!");
            let h = new tI(this._lodPlanes[r], l), c = l.uniforms, u = this._sizeLods[i] - 1,
                d = isFinite(a) ? Math.PI / (2 * u) : 2 * Math.PI / 39, p = a / d,
                f = isFinite(a) ? 1 + Math.floor(3 * p) : 20;
            f > 20 && console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`);
            let m = [], g = 0;
            for (let e = 0; e < 20; ++e) {
                let t = e / p, i = Math.exp(-t * t / 2);
                m.push(i), 0 === e ? g += i : e < f && (g += 2 * i)
            }
            for (let e = 0; e < m.length; e++) m[e] = m[e] / g;
            c.envMap.value = e.texture, c.samples.value = f, c.weights.value = m, c.latitudinal.value = "latitudinal" === n, s && (c.poleAxis.value = s);
            let {_lodMax: v} = this;
            c.dTheta.value = d, c.mipInt.value = v - i;
            let _ = this._sizeLods[r], x = 4 * (this._cubeSize - _);
            a_(t, 3 * _ * (r > v - 4 ? r - v + 4 : 0), x, 3 * _, 2 * _), o.setRenderTarget(t), o.render(h, ac)
        }
    }

    function av(e, t, i) {
        let r = new H(e, t, i);
        return r.texture.mapping = 306, r.texture.name = "PMREM.cubeUv", r.scissorTest = !0, r
    }

    function a_(e, t, i, r, a) {
        e.viewport.set(t, i, r, a), e.scissor.set(t, i, r, a)
    }

    function ax() {
        return new tH({
            name: "EquirectangularToCubeUV",
            uniforms: {envMap: {value: null}},
            vertexShader: aM(),
            fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;
#include <common>
void main(){vec3 outputDirection=normalize(vOutputDirection);vec2 uv=equirectUv(outputDirection);gl_FragColor=vec4(texture2D(envMap,uv).rgb,1.0);}`,
            blending: 0,
            depthTest: !1,
            depthWrite: !1
        })
    }

    function ay() {
        return new tH({
            name: "CubemapToCubeUV",
            uniforms: {envMap: {value: null}, flipEnvMap: {value: -1}},
            vertexShader: aM(),
            fragmentShader: "precision mediump float;precision mediump int;uniform float flipEnvMap;varying vec3 vOutputDirection;uniform samplerCube envMap;void main(){gl_FragColor=textureCube(envMap,vec3(flipEnvMap*vOutputDirection.x,vOutputDirection.yz));}",
            blending: 0,
            depthTest: !1,
            depthWrite: !1
        })
    }

    function aM() {
        return "precision mediump float;precision mediump int;attribute float faceIndex;varying vec3 vOutputDirection;vec3 getDirection(vec2 uv,float face){uv=2.0*uv-1.0;vec3 direction=vec3(uv,1.0);if(face==0.0){direction=direction.zyx;}else if(face==1.0){direction=direction.xzy;direction.xz*=-1.0;}else if(face==2.0){direction.x*=-1.0;}else if(face==3.0){direction=direction.zyx;direction.xz*=-1.0;}else if(face==4.0){direction=direction.xzy;direction.xy*=-1.0;}else if(face==5.0){direction.z*=-1.0;}return direction;}void main(){vOutputDirection=getDirection(uv,faceIndex);gl_Position=vec4(position,1.0);}"
    }

    function aS(e) {
        let t = new WeakMap, i = null;

        function r(e) {
            let i = e.target;
            i.removeEventListener("dispose", r);
            let a = t.get(i);
            void 0 !== a && (t.delete(i), a.dispose())
        }

        return {
            get: function (a) {
                if (a && a.isTexture) {
                    let n = a.mapping, s = 303 === n || 304 === n, o = 301 === n || 302 === n;
                    if (s || o) {
                        if (a.isRenderTargetTexture && !0 === a.needsPMREMUpdate) {
                            a.needsPMREMUpdate = !1;
                            let r = t.get(a);
                            return null === i && (i = new ag(e)), r = s ? i.fromEquirectangular(a, r) : i.fromCubemap(a, r), t.set(a, r), r.texture
                        }
                        if (t.has(a)) return t.get(a).texture;
                        {
                            let n = a.image;
                            if (!(s && n && n.height > 0 || o && n && function (e) {
                                let t = 0;
                                for (let i = 0; i < 6; i++) void 0 !== e[i] && t++;
                                return 6 === t
                            }(n))) return null;
                            {
                                null === i && (i = new ag(e));
                                let n = s ? i.fromEquirectangular(a) : i.fromCubemap(a);
                                return t.set(a, n), a.addEventListener("dispose", r), n.texture
                            }
                        }
                    }
                }
                return a
            }, dispose: function () {
                t = new WeakMap, null !== i && (i.dispose(), i = null)
            }
        }
    }

    function ab(e) {
        let t = {};

        function i(i) {
            let r;
            if (void 0 !== t[i]) return t[i];
            switch (i) {
                case"WEBGL_depth_texture":
                    r = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
                    break;
                case"EXT_texture_filter_anisotropic":
                    r = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                    break;
                case"WEBGL_compressed_texture_s3tc":
                    r = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                    break;
                case"WEBGL_compressed_texture_pvrtc":
                    r = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                    break;
                default:
                    r = e.getExtension(i)
            }
            return t[i] = r, r
        }

        return {
            has: function (e) {
                return null !== i(e)
            }, init: function (e) {
                e.isWebGL2 ? i("EXT_color_buffer_float") : (i("WEBGL_depth_texture"), i("OES_texture_float"), i("OES_texture_half_float"), i("OES_texture_half_float_linear"), i("OES_standard_derivatives"), i("OES_element_index_uint"), i("OES_vertex_array_object"), i("ANGLE_instanced_arrays")), i("OES_texture_float_linear"), i("EXT_color_buffer_half_float"), i("WEBGL_multisampled_render_to_texture")
            }, get: function (e) {
                let t = i(e);
                return null === t && console.warn("THREE.WebGLRenderer: " + e + " extension not supported."), t
            }
        }
    }

    function aw(e, t, i, r) {
        let a = {}, n = new WeakMap;

        function s(e) {
            let o = e.target;
            for (let e in null !== o.index && t.remove(o.index), o.attributes) t.remove(o.attributes[e]);
            for (let e in o.morphAttributes) {
                let i = o.morphAttributes[e];
                for (let e = 0, r = i.length; e < r; e++) t.remove(i[e])
            }
            o.removeEventListener("dispose", s), delete a[o.id];
            let l = n.get(o);
            l && (t.remove(l), n.delete(o)), r.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, i.memory.geometries--
        }

        function o(e) {
            let i = [], r = e.index, a = e.attributes.position, s = 0;
            if (null !== r) {
                let e = r.array;
                s = r.version;
                for (let t = 0, r = e.length; t < r; t += 3) {
                    let r = e[t + 0], a = e[t + 1], n = e[t + 2];
                    i.push(r, a, a, n, n, r)
                }
            } else {
                if (void 0 === a) return;
                let e = a.array;
                s = a.version;
                for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) {
                    let e = t + 0, r = t + 1, a = t + 2;
                    i.push(e, r, r, a, a, e)
                }
            }
            let o = new (S(i) ? to : ts)(i, 1);
            o.version = s;
            let l = n.get(e);
            l && t.remove(l), n.set(e, o)
        }

        return {
            get: function (e, t) {
                return !0 === a[t.id] || (t.addEventListener("dispose", s), a[t.id] = !0, i.memory.geometries++), t
            }, update: function (e) {
                let i = e.attributes;
                for (let e in i) t.update(i[e], 34962);
                let r = e.morphAttributes;
                for (let e in r) {
                    let i = r[e];
                    for (let e = 0, r = i.length; e < r; e++) t.update(i[e], 34962)
                }
            }, getWireframeAttribute: function (e) {
                let t = n.get(e);
                if (t) {
                    let i = e.index;
                    null !== i && t.version < i.version && o(e)
                } else o(e);
                return n.get(e)
            }
        }
    }

    function aT(e, t, i, r) {
        let a, n, s;
        let o = r.isWebGL2;
        this.setMode = function (e) {
            a = e
        }, this.setIndex = function (e) {
            n = e.type, s = e.bytesPerElement
        }, this.render = function (t, r) {
            e.drawElements(a, r, n, t * s), i.update(r, a, 1)
        }, this.renderInstances = function (r, l, h) {
            let c, u;
            if (0 !== h) {
                if (o) c = e, u = "drawElementsInstanced"; else if (c = t.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", null === c) {
                    console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                    return
                }
                c[u](a, l, n, r * s, h), i.update(l, a, h)
            }
        }
    }

    function aE(e) {
        let t = {frame: 0, calls: 0, triangles: 0, points: 0, lines: 0};
        return {
            memory: {geometries: 0, textures: 0}, render: t, programs: null, autoReset: !0, reset: function () {
                t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0
            }, update: function (e, i, r) {
                switch (t.calls++, i) {
                    case 4:
                        t.triangles += r * (e / 3);
                        break;
                    case 1:
                        t.lines += r * (e / 2);
                        break;
                    case 3:
                        t.lines += r * (e - 1);
                        break;
                    case 2:
                        t.lines += r * e;
                        break;
                    case 0:
                        t.points += r * e;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", i)
                }
            }
        }
    }

    function aA(e, t) {
        return e[0] - t[0]
    }

    function aC(e, t) {
        return Math.abs(t[1]) - Math.abs(e[1])
    }

    function aL(e, t, i) {
        let r = {}, a = new Float32Array(8), n = new WeakMap, s = new B, o = [];
        for (let e = 0; e < 8; e++) o[e] = [e, 0];
        return {
            update: function (l, h, c) {
                let u = l.morphTargetInfluences;
                if (!0 === t.isWebGL2) {
                    let r = h.morphAttributes.position || h.morphAttributes.normal || h.morphAttributes.color,
                        a = void 0 !== r ? r.length : 0, o = n.get(h);
                    if (void 0 === o || o.count !== a) {
                        void 0 !== o && o.texture.dispose();
                        let e = void 0 !== h.morphAttributes.position, i = void 0 !== h.morphAttributes.normal,
                            r = void 0 !== h.morphAttributes.color, l = h.morphAttributes.position || [],
                            c = h.morphAttributes.normal || [], u = h.morphAttributes.color || [], d = 0;
                        !0 === e && (d = 1), !0 === i && (d = 2), !0 === r && (d = 3);
                        let p = h.attributes.position.count * d, f = 1;
                        p > t.maxTextureSize && (f = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
                        let m = new Float32Array(p * f * 4 * a), g = new V(m, p, f, a);
                        g.type = 1015, g.needsUpdate = !0;
                        let v = 4 * d;
                        for (let t = 0; t < a; t++) {
                            let a = l[t], n = c[t], o = u[t], h = p * f * 4 * t;
                            for (let t = 0; t < a.count; t++) {
                                let l = t * v;
                                !0 === e && (s.fromBufferAttribute(a, t), m[h + l + 0] = s.x, m[h + l + 1] = s.y, m[h + l + 2] = s.z, m[h + l + 3] = 0), !0 === i && (s.fromBufferAttribute(n, t), m[h + l + 4] = s.x, m[h + l + 5] = s.y, m[h + l + 6] = s.z, m[h + l + 7] = 0), !0 === r && (s.fromBufferAttribute(o, t), m[h + l + 8] = s.x, m[h + l + 9] = s.y, m[h + l + 10] = s.z, m[h + l + 11] = 4 === o.itemSize ? s.w : 1)
                            }
                        }
                        o = {
                            count: a,
                            texture: g,
                            size: new x(p, f)
                        }, n.set(h, o), h.addEventListener("dispose", function e() {
                            g.dispose(), n.delete(h), h.removeEventListener("dispose", e)
                        })
                    }
                    let l = 0;
                    for (let e = 0; e < u.length; e++) l += u[e];
                    let d = h.morphTargetsRelative ? 1 : 1 - l;
                    c.getUniforms().setValue(e, "morphTargetBaseInfluence", d), c.getUniforms().setValue(e, "morphTargetInfluences", u), c.getUniforms().setValue(e, "morphTargetsTexture", o.texture, i), c.getUniforms().setValue(e, "morphTargetsTextureSize", o.size)
                } else {
                    let t = void 0 === u ? 0 : u.length, i = r[h.id];
                    if (void 0 === i || i.length !== t) {
                        i = [];
                        for (let e = 0; e < t; e++) i[e] = [e, 0];
                        r[h.id] = i
                    }
                    for (let e = 0; e < t; e++) {
                        let t = i[e];
                        t[0] = e, t[1] = u[e]
                    }
                    i.sort(aC);
                    for (let e = 0; e < 8; e++) e < t && i[e][1] ? (o[e][0] = i[e][0], o[e][1] = i[e][1]) : (o[e][0] = Number.MAX_SAFE_INTEGER, o[e][1] = 0);
                    o.sort(aA);
                    let n = h.morphAttributes.position, s = h.morphAttributes.normal, l = 0;
                    for (let e = 0; e < 8; e++) {
                        let t = o[e], i = t[0], r = t[1];
                        i !== Number.MAX_SAFE_INTEGER && r ? (n && h.getAttribute("morphTarget" + e) !== n[i] && h.setAttribute("morphTarget" + e, n[i]), s && h.getAttribute("morphNormal" + e) !== s[i] && h.setAttribute("morphNormal" + e, s[i]), a[e] = r, l += r) : (n && !0 === h.hasAttribute("morphTarget" + e) && h.deleteAttribute("morphTarget" + e), s && !0 === h.hasAttribute("morphNormal" + e) && h.deleteAttribute("morphNormal" + e), a[e] = 0)
                    }
                    let d = h.morphTargetsRelative ? 1 : 1 - l;
                    c.getUniforms().setValue(e, "morphTargetBaseInfluence", d), c.getUniforms().setValue(e, "morphTargetInfluences", a)
                }
            }
        }
    }

    function aP(e, t, i, r) {
        let a = new WeakMap;

        function n(e) {
            let t = e.target;
            t.removeEventListener("dispose", n), i.remove(t.instanceMatrix), null !== t.instanceColor && i.remove(t.instanceColor)
        }

        return {
            update: function (e) {
                let s = r.render.frame, o = e.geometry, l = t.get(e, o);
                if (a.get(l) !== s && (t.update(l), a.set(l, s)), e.isInstancedMesh && (!1 === e.hasEventListener("dispose", n) && e.addEventListener("dispose", n), a.get(e) !== s && (i.update(e.instanceMatrix, 34962), null !== e.instanceColor && i.update(e.instanceColor, 34962), a.set(e, s))), e.isSkinnedMesh) {
                    let t = e.skeleton;
                    a.get(t) !== s && (t.update(), a.set(t, s))
                }
                return l
            }, dispose: function () {
                a = new WeakMap
            }
        }
    }

    let aR = new F, aD = new V, aU = new class extends F {
        constructor(e = null, t = 1, i = 1, r = 1) {
            super(null), this.isData3DTexture = !0, this.image = {
                data: e,
                width: t,
                height: i,
                depth: r
            }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
        }
    }, aI = new tj, aN = [], aO = [], az = new Float32Array(16), aF = new Float32Array(9), aB = new Float32Array(4);

    function ak(e, t, i) {
        let r = e[0];
        if (r <= 0 || r > 0) return e;
        let a = t * i, n = aN[a];
        if (void 0 === n && (n = new Float32Array(a), aN[a] = n), 0 !== t) {
            r.toArray(n, 0);
            for (let r = 1, a = 0; r !== t; ++r) a += i, e[r].toArray(n, a)
        }
        return n
    }

    function aH(e, t) {
        if (e.length !== t.length) return !1;
        for (let i = 0, r = e.length; i < r; i++) if (e[i] !== t[i]) return !1;
        return !0
    }

    function aV(e, t) {
        for (let i = 0, r = t.length; i < r; i++) e[i] = t[i]
    }

    function aG(e, t) {
        let i = aO[t];
        void 0 === i && (i = new Int32Array(t), aO[t] = i);
        for (let r = 0; r !== t; ++r) i[r] = e.allocateTextureUnit();
        return i
    }

    function aW(e, t) {
        let i = this.cache;
        i[0] !== t && (e.uniform1f(this.addr, t), i[0] = t)
    }

    function aj(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y); else {
            if (aH(i, t)) return;
            e.uniform2fv(this.addr, t), aV(i, t)
        }
    }

    function aq(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z); else if (void 0 !== t.r) (i[0] !== t.r || i[1] !== t.g || i[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), i[0] = t.r, i[1] = t.g, i[2] = t.b); else {
            if (aH(i, t)) return;
            e.uniform3fv(this.addr, t), aV(i, t)
        }
    }

    function aX(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w); else {
            if (aH(i, t)) return;
            e.uniform4fv(this.addr, t), aV(i, t)
        }
    }

    function aY(e, t) {
        let i = this.cache, r = t.elements;
        if (void 0 === r) {
            if (aH(i, t)) return;
            e.uniformMatrix2fv(this.addr, !1, t), aV(i, t)
        } else {
            if (aH(i, r)) return;
            aB.set(r), e.uniformMatrix2fv(this.addr, !1, aB), aV(i, r)
        }
    }

    function aZ(e, t) {
        let i = this.cache, r = t.elements;
        if (void 0 === r) {
            if (aH(i, t)) return;
            e.uniformMatrix3fv(this.addr, !1, t), aV(i, t)
        } else {
            if (aH(i, r)) return;
            aF.set(r), e.uniformMatrix3fv(this.addr, !1, aF), aV(i, r)
        }
    }

    function aK(e, t) {
        let i = this.cache, r = t.elements;
        if (void 0 === r) {
            if (aH(i, t)) return;
            e.uniformMatrix4fv(this.addr, !1, t), aV(i, t)
        } else {
            if (aH(i, r)) return;
            az.set(r), e.uniformMatrix4fv(this.addr, !1, az), aV(i, r)
        }
    }

    function aJ(e, t) {
        let i = this.cache;
        i[0] !== t && (e.uniform1i(this.addr, t), i[0] = t)
    }

    function aQ(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y); else {
            if (aH(i, t)) return;
            e.uniform2iv(this.addr, t), aV(i, t)
        }
    }

    function a$(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z); else {
            if (aH(i, t)) return;
            e.uniform3iv(this.addr, t), aV(i, t)
        }
    }

    function a0(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w); else {
            if (aH(i, t)) return;
            e.uniform4iv(this.addr, t), aV(i, t)
        }
    }

    function a1(e, t) {
        let i = this.cache;
        i[0] !== t && (e.uniform1ui(this.addr, t), i[0] = t)
    }

    function a3(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), i[0] = t.x, i[1] = t.y); else {
            if (aH(i, t)) return;
            e.uniform2uiv(this.addr, t), aV(i, t)
        }
    }

    function a2(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), i[0] = t.x, i[1] = t.y, i[2] = t.z); else {
            if (aH(i, t)) return;
            e.uniform3uiv(this.addr, t), aV(i, t)
        }
    }

    function a4(e, t) {
        let i = this.cache;
        if (void 0 !== t.x) (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = t.w); else {
            if (aH(i, t)) return;
            e.uniform4uiv(this.addr, t), aV(i, t)
        }
    }

    function a5(e, t, i) {
        let r = this.cache, a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), i.setTexture2D(t || aR, a)
    }

    function a6(e, t, i) {
        let r = this.cache, a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), i.setTexture3D(t || aU, a)
    }

    function a8(e, t, i) {
        let r = this.cache, a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), i.setTextureCube(t || aI, a)
    }

    function a7(e, t, i) {
        let r = this.cache, a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), i.setTexture2DArray(t || aD, a)
    }

    function a9(e, t) {
        e.uniform1fv(this.addr, t)
    }

    function ne(e, t) {
        let i = ak(t, this.size, 2);
        e.uniform2fv(this.addr, i)
    }

    function nt(e, t) {
        let i = ak(t, this.size, 3);
        e.uniform3fv(this.addr, i)
    }

    function ni(e, t) {
        let i = ak(t, this.size, 4);
        e.uniform4fv(this.addr, i)
    }

    function nr(e, t) {
        let i = ak(t, this.size, 4);
        e.uniformMatrix2fv(this.addr, !1, i)
    }

    function na(e, t) {
        let i = ak(t, this.size, 9);
        e.uniformMatrix3fv(this.addr, !1, i)
    }

    function nn(e, t) {
        let i = ak(t, this.size, 16);
        e.uniformMatrix4fv(this.addr, !1, i)
    }

    function ns(e, t) {
        e.uniform1iv(this.addr, t)
    }

    function no(e, t) {
        e.uniform2iv(this.addr, t)
    }

    function nl(e, t) {
        e.uniform3iv(this.addr, t)
    }

    function nh(e, t) {
        e.uniform4iv(this.addr, t)
    }

    function nc(e, t) {
        e.uniform1uiv(this.addr, t)
    }

    function nu(e, t) {
        e.uniform2uiv(this.addr, t)
    }

    function nd(e, t) {
        e.uniform3uiv(this.addr, t)
    }

    function np(e, t) {
        e.uniform4uiv(this.addr, t)
    }

    function nf(e, t, i) {
        let r = this.cache, a = t.length, n = aG(i, a);
        aH(r, n) || (e.uniform1iv(this.addr, n), aV(r, n));
        for (let e = 0; e !== a; ++e) i.setTexture2D(t[e] || aR, n[e])
    }

    function nm(e, t, i) {
        let r = this.cache, a = t.length, n = aG(i, a);
        aH(r, n) || (e.uniform1iv(this.addr, n), aV(r, n));
        for (let e = 0; e !== a; ++e) i.setTexture3D(t[e] || aU, n[e])
    }

    function ng(e, t, i) {
        let r = this.cache, a = t.length, n = aG(i, a);
        aH(r, n) || (e.uniform1iv(this.addr, n), aV(r, n));
        for (let e = 0; e !== a; ++e) i.setTextureCube(t[e] || aI, n[e])
    }

    function nv(e, t, i) {
        let r = this.cache, a = t.length, n = aG(i, a);
        aH(r, n) || (e.uniform1iv(this.addr, n), aV(r, n));
        for (let e = 0; e !== a; ++e) i.setTexture2DArray(t[e] || aD, n[e])
    }

    class n_ {
        constructor(e, t, i) {
            this.id = e, this.addr = i, this.cache = [], this.setValue = function (e) {
                switch (e) {
                    case 5126:
                        return aW;
                    case 35664:
                        return aj;
                    case 35665:
                        return aq;
                    case 35666:
                        return aX;
                    case 35674:
                        return aY;
                    case 35675:
                        return aZ;
                    case 35676:
                        return aK;
                    case 5124:
                    case 35670:
                        return aJ;
                    case 35667:
                    case 35671:
                        return aQ;
                    case 35668:
                    case 35672:
                        return a$;
                    case 35669:
                    case 35673:
                        return a0;
                    case 5125:
                        return a1;
                    case 36294:
                        return a3;
                    case 36295:
                        return a2;
                    case 36296:
                        return a4;
                    case 35678:
                    case 36198:
                    case 36298:
                    case 36306:
                    case 35682:
                        return a5;
                    case 35679:
                    case 36299:
                    case 36307:
                        return a6;
                    case 35680:
                    case 36300:
                    case 36308:
                    case 36293:
                        return a8;
                    case 36289:
                    case 36303:
                    case 36311:
                    case 36292:
                        return a7
                }
            }(t.type)
        }
    }

    class nx {
        constructor(e, t, i) {
            this.id = e, this.addr = i, this.cache = [], this.size = t.size, this.setValue = function (e) {
                switch (e) {
                    case 5126:
                        return a9;
                    case 35664:
                        return ne;
                    case 35665:
                        return nt;
                    case 35666:
                        return ni;
                    case 35674:
                        return nr;
                    case 35675:
                        return na;
                    case 35676:
                        return nn;
                    case 5124:
                    case 35670:
                        return ns;
                    case 35667:
                    case 35671:
                        return no;
                    case 35668:
                    case 35672:
                        return nl;
                    case 35669:
                    case 35673:
                        return nh;
                    case 5125:
                        return nc;
                    case 36294:
                        return nu;
                    case 36295:
                        return nd;
                    case 36296:
                        return np;
                    case 35678:
                    case 36198:
                    case 36298:
                    case 36306:
                    case 35682:
                        return nf;
                    case 35679:
                    case 36299:
                    case 36307:
                        return nm;
                    case 35680:
                    case 36300:
                    case 36308:
                    case 36293:
                        return ng;
                    case 36289:
                    case 36303:
                    case 36311:
                    case 36292:
                        return nv
                }
            }(t.type)
        }
    }

    class ny {
        constructor(e) {
            this.id = e, this.seq = [], this.map = {}
        }

        setValue(e, t, i) {
            let r = this.seq;
            for (let a = 0, n = r.length; a !== n; ++a) {
                let n = r[a];
                n.setValue(e, t[n.id], i)
            }
        }
    }

    let nM = /(\w+)(\])?(\[|\.)?/g;

    function nS(e, t) {
        e.seq.push(t), e.map[t.id] = t
    }

    class nb {
        constructor(e, t) {
            this.seq = [], this.map = {};
            let i = e.getProgramParameter(t, 35718);
            for (let r = 0; r < i; ++r) {
                let i = e.getActiveUniform(t, r), a = e.getUniformLocation(t, i.name);
                !function (e, t, i) {
                    let r = e.name, a = r.length;
                    for (nM.lastIndex = 0; ;) {
                        let n = nM.exec(r), s = nM.lastIndex, o = n[1], l = "]" === n[2], h = n[3];
                        if (l && (o |= 0), void 0 === h || "[" === h && s + 2 === a) {
                            nS(i, void 0 === h ? new n_(o, e, t) : new nx(o, e, t));
                            break
                        }
                        {
                            let e = i.map, t = e[o];
                            void 0 === t && nS(i, t = new ny(o)), i = t
                        }
                    }
                }(i, a, this)
            }
        }

        setValue(e, t, i, r) {
            let a = this.map[t];
            void 0 !== a && a.setValue(e, i, r)
        }

        setOptional(e, t, i) {
            let r = t[i];
            void 0 !== r && this.setValue(e, i, r)
        }

        static upload(e, t, i, r) {
            for (let a = 0, n = t.length; a !== n; ++a) {
                let n = t[a], s = i[n.id];
                !1 !== s.needsUpdate && n.setValue(e, s.value, r)
            }
        }

        static seqWithValue(e, t) {
            let i = [];
            for (let r = 0, a = e.length; r !== a; ++r) {
                let a = e[r];
                a.id in t && i.push(a)
            }
            return i
        }
    }

    function nw(e, t, i) {
        let r = e.createShader(t);
        return e.shaderSource(r, i), e.compileShader(r), r
    }

    let nT = 0;

    function nE(e, t, i) {
        let r = e.getShaderParameter(t, 35713), a = e.getShaderInfoLog(t).trim();
        if (r && "" === a) return "";
        let n = /ERROR: 0:(\d+)/.exec(a);
        if (!n) return a;
        {
            let r = parseInt(n[1]);
            return i.toUpperCase() + "\n\n" + a + "\n\n" + function (e, t) {
                let i = e.split("\n"), r = [], a = Math.max(t - 6, 0), n = Math.min(t + 6, i.length);
                for (let e = a; e < n; e++) {
                    let a = e + 1;
                    r.push(`${a === t ? ">" : " "} ${a}: ${i[e]}`)
                }
                return r.join("\n")
            }(e.getShaderSource(t), r)
        }
    }

    function nA(e) {
        return "" !== e
    }

    function nC(e, t) {
        let i = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
        return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, i).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
    }

    function nL(e, t) {
        return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection)
    }

    let nP = /^[ \t]*#include +<([\w\d./]+)>/gm;

    function nR(e) {
        return e.replace(nP, nU)
    }

    let nD = new Map([["encodings_fragment", "colorspace_fragment"], ["encodings_pars_fragment", "colorspace_pars_fragment"], ["output_fragment", "opaque_fragment"]]);

    function nU(e, t) {
        let i = r7[t];
        if (void 0 === i) {
            let e = nD.get(t);
            if (void 0 !== e) i = r7[e], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, e); else throw Error("Can not resolve #include <" + t + ">")
        }
        return nR(i)
    }

    let nI = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

    function nN(e) {
        return e.replace(nI, nO)
    }

    function nO(e, t, i, r) {
        let a = "";
        for (let e = parseInt(t); e < parseInt(i); e++) a += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
        return a
    }

    function nz(e) {
        let t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;";
        return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t
    }

    function nF(e, t, i, r) {
        let a, o, h, c, u, d;
        let p = e.getContext(), f = i.defines, m = i.vertexShader, g = i.fragmentShader,
            v = (u = "SHADOWMAP_TYPE_BASIC", 1 === i.shadowMapType ? u = "SHADOWMAP_TYPE_PCF" : 2 === i.shadowMapType ? u = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === i.shadowMapType && (u = "SHADOWMAP_TYPE_VSM"), u),
            _ = function (e) {
                let t = "ENVMAP_TYPE_CUBE";
                if (e.envMap) switch (e.envMapMode) {
                    case 301:
                    case 302:
                        t = "ENVMAP_TYPE_CUBE";
                        break;
                    case 306:
                        t = "ENVMAP_TYPE_CUBE_UV"
                }
                return t
            }(i),
            x = (d = "ENVMAP_MODE_REFLECTION", i.envMap && 302 === i.envMapMode && (d = "ENVMAP_MODE_REFRACTION"), d),
            y = function (e) {
                let t = "ENVMAP_BLENDING_NONE";
                if (e.envMap) switch (e.combine) {
                    case 0:
                        t = "ENVMAP_BLENDING_MULTIPLY";
                        break;
                    case 1:
                        t = "ENVMAP_BLENDING_MIX";
                        break;
                    case 2:
                        t = "ENVMAP_BLENDING_ADD"
                }
                return t
            }(i), M = function (e) {
                let t = e.envMapCubeUVHeight;
                if (null === t) return null;
                let i = Math.log2(t) - 2;
                return {texelWidth: 1 / (3 * Math.max(Math.pow(2, i), 112)), texelHeight: 1 / t, maxMip: i}
            }(i), S = i.isWebGL2 ? "" : function (e) {
                let t = [e.extensionDerivatives || e.envMapCubeUVHeight || e.bumpMap || e.normalMapTangentSpace || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (e.extensionShaderTextureLOD || e.envMap || e.transmission) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""];
                return t.filter(nA).join("\n")
            }(i), b = function (e) {
                let t = [];
                for (let i in e) {
                    let r = e[i];
                    !1 !== r && t.push("#define " + i + " " + r)
                }
                return t.join("\n")
            }(f), w = p.createProgram(), T = i.glslVersion ? "#version " + i.glslVersion + "\n" : "";
        i.isRawShaderMaterial ? ((a = ["#define SHADER_TYPE " + i.shaderType, "#define SHADER_NAME " + i.shaderName, b].filter(nA).join("\n")).length > 0 && (a += "\n"), (o = [S, "#define SHADER_TYPE " + i.shaderType, "#define SHADER_NAME " + i.shaderName, b].filter(nA).join("\n")).length > 0 && (o += "\n")) : (a = [nz(i), "#define SHADER_TYPE " + i.shaderType, "#define SHADER_NAME " + i.shaderName, b, i.instancing ? "#define USE_INSTANCING" : "", i.instancingColor ? "#define USE_INSTANCING_COLOR" : "", i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + x : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", i.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", i.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", i.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.alphaHash ? "#define USE_ALPHAHASH" : "", i.transmission ? "#define USE_TRANSMISSION" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.thicknessMap ? "#define USE_THICKNESSMAP" : "", i.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", i.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", i.mapUv ? "#define MAP_UV " + i.mapUv : "", i.alphaMapUv ? "#define ALPHAMAP_UV " + i.alphaMapUv : "", i.lightMapUv ? "#define LIGHTMAP_UV " + i.lightMapUv : "", i.aoMapUv ? "#define AOMAP_UV " + i.aoMapUv : "", i.emissiveMapUv ? "#define EMISSIVEMAP_UV " + i.emissiveMapUv : "", i.bumpMapUv ? "#define BUMPMAP_UV " + i.bumpMapUv : "", i.normalMapUv ? "#define NORMALMAP_UV " + i.normalMapUv : "", i.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + i.displacementMapUv : "", i.metalnessMapUv ? "#define METALNESSMAP_UV " + i.metalnessMapUv : "", i.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + i.roughnessMapUv : "", i.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + i.anisotropyMapUv : "", i.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + i.clearcoatMapUv : "", i.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + i.clearcoatNormalMapUv : "", i.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + i.clearcoatRoughnessMapUv : "", i.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + i.iridescenceMapUv : "", i.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + i.iridescenceThicknessMapUv : "", i.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + i.sheenColorMapUv : "", i.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + i.sheenRoughnessMapUv : "", i.specularMapUv ? "#define SPECULARMAP_UV " + i.specularMapUv : "", i.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + i.specularColorMapUv : "", i.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + i.specularIntensityMapUv : "", i.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + i.transmissionMapUv : "", i.thicknessMapUv ? "#define THICKNESSMAP_UV " + i.thicknessMapUv : "", i.vertexTangents && !1 === i.flatShading ? "#define USE_TANGENT" : "", i.vertexColors ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUv1s ? "#define USE_UV1" : "", i.vertexUv2s ? "#define USE_UV2" : "", i.vertexUv3s ? "#define USE_UV3" : "", i.pointsUvs ? "#define USE_POINTS_UV" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.skinning ? "#define USE_SKINNING" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals && !1 === i.flatShading ? "#define USE_MORPHNORMALS" : "", i.morphColors && i.isWebGL2 ? "#define USE_MORPHCOLORS" : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + i.morphTextureStride : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_COUNT " + i.morphTargetsCount : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + v : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i.useLegacyLights ? "#define LEGACY_LIGHTS" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", "\n"].filter(nA).join("\n"), o = [S, nz(i), "#define SHADER_TYPE " + i.shaderType, "#define SHADER_NAME " + i.shaderName, b, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.matcap ? "#define USE_MATCAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + _ : "", i.envMap ? "#define " + x : "", i.envMap ? "#define " + y : "", M ? "#define CUBEUV_TEXEL_WIDTH " + M.texelWidth : "", M ? "#define CUBEUV_TEXEL_HEIGHT " + M.texelHeight : "", M ? "#define CUBEUV_MAX_MIP " + M.maxMip + ".0" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", i.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.anisotropy ? "#define USE_ANISOTROPY" : "", i.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", i.clearcoat ? "#define USE_CLEARCOAT" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.iridescence ? "#define USE_IRIDESCENCE" : "", i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", i.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.alphaTest ? "#define USE_ALPHATEST" : "", i.alphaHash ? "#define USE_ALPHAHASH" : "", i.sheen ? "#define USE_SHEEN" : "", i.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", i.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", i.transmission ? "#define USE_TRANSMISSION" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.thicknessMap ? "#define USE_THICKNESSMAP" : "", i.vertexTangents && !1 === i.flatShading ? "#define USE_TANGENT" : "", i.vertexColors || i.instancingColor ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUv1s ? "#define USE_UV1" : "", i.vertexUv2s ? "#define USE_UV2" : "", i.vertexUv3s ? "#define USE_UV3" : "", i.pointsUvs ? "#define USE_POINTS_UV" : "", i.gradientMap ? "#define USE_GRADIENTMAP" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + v : "", i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i.useLegacyLights ? "#define LEGACY_LIGHTS" : "", i.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== i.toneMapping ? "#define TONE_MAPPING" : "", 0 !== i.toneMapping ? r7.tonemapping_pars_fragment : "", 0 !== i.toneMapping ? function (e, t) {
            let i;
            switch (t) {
                case 1:
                    i = "Linear";
                    break;
                case 2:
                    i = "Reinhard";
                    break;
                case 3:
                    i = "OptimizedCineon";
                    break;
                case 4:
                    i = "ACESFilmic";
                    break;
                case 5:
                    i = "Custom";
                    break;
                default:
                    console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), i = "Linear"
            }
            return "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }"
        }("toneMapping", i.toneMapping) : "", i.dithering ? "#define DITHERING" : "", i.opaque ? "#define OPAQUE" : "", r7.colorspace_pars_fragment, function (e, t) {
            let i = function (e) {
                switch (e) {
                    case s:
                        return ["Linear", "( value )"];
                    case n:
                        return ["sRGB", "( value )"];
                    default:
                        return console.warn("THREE.WebGLProgram: Unsupported color space:", e), ["Linear", "( value )"]
                }
            }(t);
            return "vec4 " + e + "( vec4 value ) { return LinearTo" + i[0] + i[1] + "; }"
        }("linearToOutputTexel", i.outputColorSpace), i.useDepthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "", "\n"].filter(nA).join("\n")), m = nL(m = nC(m = nR(m), i), i), g = nL(g = nC(g = nR(g), i), i), m = nN(m), g = nN(g), i.isWebGL2 && !0 !== i.isRawShaderMaterial && (T = "#version 300 es\n", a = "precision mediump sampler2DArray;\n#define attribute in\n#define varying out\n#define texture2D texture\n" + a, o = ["#define varying in", i.glslVersion === l ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", i.glslVersion === l ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + o);
        let E = T + a + m, A = T + o + g, C = nw(p, 35633, E), L = nw(p, 35632, A);
        if (p.attachShader(w, C), p.attachShader(w, L), void 0 !== i.index0AttributeName ? p.bindAttribLocation(w, 0, i.index0AttributeName) : !0 === i.morphTargets && p.bindAttribLocation(w, 0, "position"), p.linkProgram(w), e.debug.checkShaderErrors) {
            let t = p.getProgramInfoLog(w).trim(), i = p.getShaderInfoLog(C).trim(), r = p.getShaderInfoLog(L).trim(),
                n = !0, s = !0;
            if (!1 === p.getProgramParameter(w, 35714)) {
                if (n = !1, "function" == typeof e.debug.onShaderError) e.debug.onShaderError(p, w, C, L); else {
                    let e = nE(p, C, "vertex"), i = nE(p, L, "fragment");
                    console.error("THREE.WebGLProgram: Shader Error " + p.getError() + " - VALIDATE_STATUS " + p.getProgramParameter(w, 35715) + "\n\nProgram Info Log: " + t + "\n" + e + "\n" + i)
                }
            } else "" !== t ? console.warn("THREE.WebGLProgram: Program Info Log:", t) : ("" === i || "" === r) && (s = !1);
            s && (this.diagnostics = {
                runnable: n,
                programLog: t,
                vertexShader: {log: i, prefix: a},
                fragmentShader: {log: r, prefix: o}
            })
        }
        return p.deleteShader(C), p.deleteShader(L), this.getUniforms = function () {
            return void 0 === h && (h = new nb(p, w)), h
        }, this.getAttributes = function () {
            return void 0 === c && (c = function (e, t) {
                let i = {}, r = e.getProgramParameter(t, 35721);
                for (let a = 0; a < r; a++) {
                    let r = e.getActiveAttrib(t, a), n = r.name, s = 1;
                    35674 === r.type && (s = 2), 35675 === r.type && (s = 3), 35676 === r.type && (s = 4), i[n] = {
                        type: r.type,
                        location: e.getAttribLocation(t, n),
                        locationSize: s
                    }
                }
                return i
            }(p, w)), c
        }, this.destroy = function () {
            r.releaseStatesOfProgram(this), p.deleteProgram(w), this.program = void 0
        }, this.type = i.shaderType, this.name = i.shaderName, this.id = nT++, this.cacheKey = t, this.usedTimes = 1, this.program = w, this.vertexShader = C, this.fragmentShader = L, this
    }

    let nB = 0;

    class nk {
        constructor() {
            this.shaderCache = new Map, this.materialCache = new Map
        }

        update(e) {
            let t = e.vertexShader, i = e.fragmentShader, r = this._getShaderStage(t), a = this._getShaderStage(i),
                n = this._getShaderCacheForMaterial(e);
            return !1 === n.has(r) && (n.add(r), r.usedTimes++), !1 === n.has(a) && (n.add(a), a.usedTimes++), this
        }

        remove(e) {
            let t = this.materialCache.get(e);
            for (let e of t) e.usedTimes--, 0 === e.usedTimes && this.shaderCache.delete(e.code);
            return this.materialCache.delete(e), this
        }

        getVertexShaderID(e) {
            return this._getShaderStage(e.vertexShader).id
        }

        getFragmentShaderID(e) {
            return this._getShaderStage(e.fragmentShader).id
        }

        dispose() {
            this.shaderCache.clear(), this.materialCache.clear()
        }

        _getShaderCacheForMaterial(e) {
            let t = this.materialCache, i = t.get(e);
            return void 0 === i && (i = new Set, t.set(e, i)), i
        }

        _getShaderStage(e) {
            let t = this.shaderCache, i = t.get(e);
            return void 0 === i && (i = new nH(e), t.set(e, i)), i
        }
    }

    class nH {
        constructor(e) {
            this.id = nB++, this.code = e, this.usedTimes = 0
        }
    }

    function nV(e, t, i, r, a, o, l) {
        let h = new eR, c = new nk, u = [], d = a.isWebGL2, p = a.logarithmicDepthBuffer, f = a.vertexTextures,
            m = a.precision, g = {
                MeshDepthMaterial: "depth",
                MeshDistanceMaterial: "distanceRGBA",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshToonMaterial: "toon",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                MeshMatcapMaterial: "matcap",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points",
                ShadowMaterial: "shadow",
                SpriteMaterial: "sprite"
            };

        function v(e) {
            return 0 === e ? "uv" : `uv${e}`
        }

        return {
            getParameters: function (o, h, u, _, x) {
                let y, M, S, b;
                let w = _.fog, T = x.geometry, E = o.isMeshStandardMaterial ? _.environment : null,
                    A = (o.isMeshStandardMaterial ? i : t).get(o.envMap || E),
                    C = A && 306 === A.mapping ? A.image.height : null, L = g[o.type];
                null !== o.precision && (m = a.getMaxPrecision(o.precision)) !== o.precision && console.warn("THREE.WebGLProgram.getParameters:", o.precision, "not supported, using", m, "instead.");
                let P = T.morphAttributes.position || T.morphAttributes.normal || T.morphAttributes.color,
                    R = void 0 !== P ? P.length : 0, D = 0;
                if (void 0 !== T.morphAttributes.position && (D = 1), void 0 !== T.morphAttributes.normal && (D = 2), void 0 !== T.morphAttributes.color && (D = 3), L) {
                    let e = ae[L];
                    y = e.vertexShader, M = e.fragmentShader
                } else y = o.vertexShader, M = o.fragmentShader, c.update(o), S = c.getVertexShaderID(o), b = c.getFragmentShaderID(o);
                let U = e.getRenderTarget(), I = !0 === x.isInstancedMesh, N = !!o.map, O = !!o.matcap, z = !!A,
                    F = !!o.aoMap, B = !!o.lightMap, k = !!o.bumpMap, H = !!o.normalMap, V = !!o.displacementMap,
                    G = !!o.emissiveMap, W = !!o.metalnessMap, j = !!o.roughnessMap, q = o.anisotropy > 0,
                    X = o.clearcoat > 0, Y = o.iridescence > 0, Z = o.sheen > 0, K = o.transmission > 0,
                    J = q && !!o.anisotropyMap, Q = X && !!o.clearcoatMap, $ = X && !!o.clearcoatNormalMap,
                    ee = X && !!o.clearcoatRoughnessMap, et = Y && !!o.iridescenceMap,
                    ei = Y && !!o.iridescenceThicknessMap, er = Z && !!o.sheenColorMap, ea = Z && !!o.sheenRoughnessMap,
                    en = !!o.specularMap, es = !!o.specularColorMap, eo = !!o.specularIntensityMap,
                    el = K && !!o.transmissionMap, eh = K && !!o.thicknessMap, ec = !!o.gradientMap, eu = !!o.alphaMap,
                    ed = o.alphaTest > 0, ep = !!o.alphaHash, ef = !!o.extensions, em = !!T.attributes.uv1,
                    eg = !!T.attributes.uv2, ev = !!T.attributes.uv3, e_ = 0;
                o.toneMapped && (null === U || !0 === U.isXRRenderTarget) && (e_ = e.toneMapping);
                let ex = {
                    isWebGL2: d,
                    shaderID: L,
                    shaderType: o.type,
                    shaderName: o.name,
                    vertexShader: y,
                    fragmentShader: M,
                    defines: o.defines,
                    customVertexShaderID: S,
                    customFragmentShaderID: b,
                    isRawShaderMaterial: !0 === o.isRawShaderMaterial,
                    glslVersion: o.glslVersion,
                    precision: m,
                    instancing: I,
                    instancingColor: I && null !== x.instanceColor,
                    supportsVertexTextures: f,
                    outputColorSpace: null === U ? e.outputColorSpace : !0 === U.isXRRenderTarget ? U.texture.colorSpace : s,
                    map: N,
                    matcap: O,
                    envMap: z,
                    envMapMode: z && A.mapping,
                    envMapCubeUVHeight: C,
                    aoMap: F,
                    lightMap: B,
                    bumpMap: k,
                    normalMap: H,
                    displacementMap: f && V,
                    emissiveMap: G,
                    normalMapObjectSpace: H && 1 === o.normalMapType,
                    normalMapTangentSpace: H && 0 === o.normalMapType,
                    metalnessMap: W,
                    roughnessMap: j,
                    anisotropy: q,
                    anisotropyMap: J,
                    clearcoat: X,
                    clearcoatMap: Q,
                    clearcoatNormalMap: $,
                    clearcoatRoughnessMap: ee,
                    iridescence: Y,
                    iridescenceMap: et,
                    iridescenceThicknessMap: ei,
                    sheen: Z,
                    sheenColorMap: er,
                    sheenRoughnessMap: ea,
                    specularMap: en,
                    specularColorMap: es,
                    specularIntensityMap: eo,
                    transmission: K,
                    transmissionMap: el,
                    thicknessMap: eh,
                    gradientMap: ec,
                    opaque: !1 === o.transparent && 1 === o.blending,
                    alphaMap: eu,
                    alphaTest: ed,
                    alphaHash: ep,
                    combine: o.combine,
                    mapUv: N && v(o.map.channel),
                    aoMapUv: F && v(o.aoMap.channel),
                    lightMapUv: B && v(o.lightMap.channel),
                    bumpMapUv: k && v(o.bumpMap.channel),
                    normalMapUv: H && v(o.normalMap.channel),
                    displacementMapUv: V && v(o.displacementMap.channel),
                    emissiveMapUv: G && v(o.emissiveMap.channel),
                    metalnessMapUv: W && v(o.metalnessMap.channel),
                    roughnessMapUv: j && v(o.roughnessMap.channel),
                    anisotropyMapUv: J && v(o.anisotropyMap.channel),
                    clearcoatMapUv: Q && v(o.clearcoatMap.channel),
                    clearcoatNormalMapUv: $ && v(o.clearcoatNormalMap.channel),
                    clearcoatRoughnessMapUv: ee && v(o.clearcoatRoughnessMap.channel),
                    iridescenceMapUv: et && v(o.iridescenceMap.channel),
                    iridescenceThicknessMapUv: ei && v(o.iridescenceThicknessMap.channel),
                    sheenColorMapUv: er && v(o.sheenColorMap.channel),
                    sheenRoughnessMapUv: ea && v(o.sheenRoughnessMap.channel),
                    specularMapUv: en && v(o.specularMap.channel),
                    specularColorMapUv: es && v(o.specularColorMap.channel),
                    specularIntensityMapUv: eo && v(o.specularIntensityMap.channel),
                    transmissionMapUv: el && v(o.transmissionMap.channel),
                    thicknessMapUv: eh && v(o.thicknessMap.channel),
                    alphaMapUv: eu && v(o.alphaMap.channel),
                    vertexTangents: !!T.attributes.tangent && (H || q),
                    vertexColors: o.vertexColors,
                    vertexAlphas: !0 === o.vertexColors && !!T.attributes.color && 4 === T.attributes.color.itemSize,
                    vertexUv1s: em,
                    vertexUv2s: eg,
                    vertexUv3s: ev,
                    pointsUvs: !0 === x.isPoints && !!T.attributes.uv && (N || eu),
                    fog: !!w,
                    useFog: !0 === o.fog,
                    fogExp2: w && w.isFogExp2,
                    flatShading: !0 === o.flatShading,
                    sizeAttenuation: !0 === o.sizeAttenuation,
                    logarithmicDepthBuffer: p,
                    skinning: !0 === x.isSkinnedMesh,
                    morphTargets: void 0 !== T.morphAttributes.position,
                    morphNormals: void 0 !== T.morphAttributes.normal,
                    morphColors: void 0 !== T.morphAttributes.color,
                    morphTargetsCount: R,
                    morphTextureStride: D,
                    numDirLights: h.directional.length,
                    numPointLights: h.point.length,
                    numSpotLights: h.spot.length,
                    numSpotLightMaps: h.spotLightMap.length,
                    numRectAreaLights: h.rectArea.length,
                    numHemiLights: h.hemi.length,
                    numDirLightShadows: h.directionalShadowMap.length,
                    numPointLightShadows: h.pointShadowMap.length,
                    numSpotLightShadows: h.spotShadowMap.length,
                    numSpotLightShadowsWithMaps: h.numSpotLightShadowsWithMaps,
                    numClippingPlanes: l.numPlanes,
                    numClipIntersection: l.numIntersection,
                    dithering: o.dithering,
                    shadowMapEnabled: e.shadowMap.enabled && u.length > 0,
                    shadowMapType: e.shadowMap.type,
                    toneMapping: e_,
                    useLegacyLights: e._useLegacyLights,
                    decodeVideoTexture: N && !0 === o.map.isVideoTexture && o.map.colorSpace === n,
                    premultipliedAlpha: o.premultipliedAlpha,
                    doubleSided: 2 === o.side,
                    flipSided: 1 === o.side,
                    useDepthPacking: o.depthPacking >= 0,
                    depthPacking: o.depthPacking || 0,
                    index0AttributeName: o.index0AttributeName,
                    extensionDerivatives: ef && !0 === o.extensions.derivatives,
                    extensionFragDepth: ef && !0 === o.extensions.fragDepth,
                    extensionDrawBuffers: ef && !0 === o.extensions.drawBuffers,
                    extensionShaderTextureLOD: ef && !0 === o.extensions.shaderTextureLOD,
                    rendererExtensionFragDepth: d || r.has("EXT_frag_depth"),
                    rendererExtensionDrawBuffers: d || r.has("WEBGL_draw_buffers"),
                    rendererExtensionShaderTextureLod: d || r.has("EXT_shader_texture_lod"),
                    customProgramCacheKey: o.customProgramCacheKey()
                };
                return ex
            }, getProgramCacheKey: function (t) {
                let i = [];
                if (t.shaderID ? i.push(t.shaderID) : (i.push(t.customVertexShaderID), i.push(t.customFragmentShaderID)), void 0 !== t.defines) for (let e in t.defines) i.push(e), i.push(t.defines[e]);
                return !1 === t.isRawShaderMaterial && (i.push(t.precision), i.push(t.outputColorSpace), i.push(t.envMapMode), i.push(t.envMapCubeUVHeight), i.push(t.mapUv), i.push(t.alphaMapUv), i.push(t.lightMapUv), i.push(t.aoMapUv), i.push(t.bumpMapUv), i.push(t.normalMapUv), i.push(t.displacementMapUv), i.push(t.emissiveMapUv), i.push(t.metalnessMapUv), i.push(t.roughnessMapUv), i.push(t.anisotropyMapUv), i.push(t.clearcoatMapUv), i.push(t.clearcoatNormalMapUv), i.push(t.clearcoatRoughnessMapUv), i.push(t.iridescenceMapUv), i.push(t.iridescenceThicknessMapUv), i.push(t.sheenColorMapUv), i.push(t.sheenRoughnessMapUv), i.push(t.specularMapUv), i.push(t.specularColorMapUv), i.push(t.specularIntensityMapUv), i.push(t.transmissionMapUv), i.push(t.thicknessMapUv), i.push(t.combine), i.push(t.fogExp2), i.push(t.sizeAttenuation), i.push(t.morphTargetsCount), i.push(t.morphAttributeCount), i.push(t.numDirLights), i.push(t.numPointLights), i.push(t.numSpotLights), i.push(t.numSpotLightMaps), i.push(t.numHemiLights), i.push(t.numRectAreaLights), i.push(t.numDirLightShadows), i.push(t.numPointLightShadows), i.push(t.numSpotLightShadows), i.push(t.numSpotLightShadowsWithMaps), i.push(t.shadowMapType), i.push(t.toneMapping), i.push(t.numClippingPlanes), i.push(t.numClipIntersection), i.push(t.depthPacking), h.disableAll(), t.isWebGL2 && h.enable(0), t.supportsVertexTextures && h.enable(1), t.instancing && h.enable(2), t.instancingColor && h.enable(3), t.matcap && h.enable(4), t.envMap && h.enable(5), t.normalMapObjectSpace && h.enable(6), t.normalMapTangentSpace && h.enable(7), t.clearcoat && h.enable(8), t.iridescence && h.enable(9), t.alphaTest && h.enable(10), t.vertexColors && h.enable(11), t.vertexAlphas && h.enable(12), t.vertexUv1s && h.enable(13), t.vertexUv2s && h.enable(14), t.vertexUv3s && h.enable(15), t.vertexTangents && h.enable(16), t.anisotropy && h.enable(17), i.push(h.mask), h.disableAll(), t.fog && h.enable(0), t.useFog && h.enable(1), t.flatShading && h.enable(2), t.logarithmicDepthBuffer && h.enable(3), t.skinning && h.enable(4), t.morphTargets && h.enable(5), t.morphNormals && h.enable(6), t.morphColors && h.enable(7), t.premultipliedAlpha && h.enable(8), t.shadowMapEnabled && h.enable(9), t.useLegacyLights && h.enable(10), t.doubleSided && h.enable(11), t.flipSided && h.enable(12), t.useDepthPacking && h.enable(13), t.dithering && h.enable(14), t.transmission && h.enable(15), t.sheen && h.enable(16), t.opaque && h.enable(17), t.pointsUvs && h.enable(18), t.decodeVideoTexture && h.enable(19), i.push(h.mask), i.push(e.outputColorSpace)), i.push(t.customProgramCacheKey), i.join()
            }, getUniforms: function (e) {
                let t;
                let i = g[e.type];
                if (i) {
                    let e = ae[i];
                    t = tk.clone(e.uniforms)
                } else t = e.uniforms;
                return t
            }, acquireProgram: function (t, i) {
                let r;
                for (let e = 0, t = u.length; e < t; e++) {
                    let t = u[e];
                    if (t.cacheKey === i) {
                        r = t, ++r.usedTimes;
                        break
                    }
                }
                return void 0 === r && (r = new nF(e, i, t, o), u.push(r)), r
            }, releaseProgram: function (e) {
                if (0 == --e.usedTimes) {
                    let t = u.indexOf(e);
                    u[t] = u[u.length - 1], u.pop(), e.destroy()
                }
            }, releaseShaderCache: function (e) {
                c.remove(e)
            }, programs: u, dispose: function () {
                c.dispose()
            }
        }
    }

    function nG() {
        let e = new WeakMap;
        return {
            get: function (t) {
                let i = e.get(t);
                return void 0 === i && (i = {}, e.set(t, i)), i
            }, remove: function (t) {
                e.delete(t)
            }, update: function (t, i, r) {
                e.get(t)[i] = r
            }, dispose: function () {
                e = new WeakMap
            }
        }
    }

    function nW(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
    }

    function nj(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
    }

    function nq() {
        let e = [], t = 0, i = [], r = [], a = [];

        function n(i, r, a, n, s, o) {
            let l = e[t];
            return void 0 === l ? (l = {
                id: i.id,
                object: i,
                geometry: r,
                material: a,
                groupOrder: n,
                renderOrder: i.renderOrder,
                z: s,
                group: o
            }, e[t] = l) : (l.id = i.id, l.object = i, l.geometry = r, l.material = a, l.groupOrder = n, l.renderOrder = i.renderOrder, l.z = s, l.group = o), t++, l
        }

        return {
            opaque: i, transmissive: r, transparent: a, init: function () {
                t = 0, i.length = 0, r.length = 0, a.length = 0
            }, push: function (e, t, s, o, l, h) {
                let c = n(e, t, s, o, l, h);
                s.transmission > 0 ? r.push(c) : !0 === s.transparent ? a.push(c) : i.push(c)
            }, unshift: function (e, t, s, o, l, h) {
                let c = n(e, t, s, o, l, h);
                s.transmission > 0 ? r.unshift(c) : !0 === s.transparent ? a.unshift(c) : i.unshift(c)
            }, finish: function () {
                for (let i = t, r = e.length; i < r; i++) {
                    let t = e[i];
                    if (null === t.id) break;
                    t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null
                }
            }, sort: function (e, t) {
                i.length > 1 && i.sort(e || nW), r.length > 1 && r.sort(t || nj), a.length > 1 && a.sort(t || nj)
            }
        }
    }

    function nX() {
        let e = new WeakMap;
        return {
            get: function (t, i) {
                let r;
                let a = e.get(t);
                return void 0 === a ? (r = new nq, e.set(t, [r])) : i >= a.length ? (r = new nq, a.push(r)) : r = a[i], r
            }, dispose: function () {
                e = new WeakMap
            }
        }
    }

    function nY() {
        let e = {};
        return {
            get: function (t) {
                let i;
                if (void 0 !== e[t.id]) return e[t.id];
                switch (t.type) {
                    case"DirectionalLight":
                        i = {direction: new W, color: new te};
                        break;
                    case"SpotLight":
                        i = {
                            position: new W,
                            direction: new W,
                            color: new te,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0
                        };
                        break;
                    case"PointLight":
                        i = {position: new W, color: new te, distance: 0, decay: 0};
                        break;
                    case"HemisphereLight":
                        i = {direction: new W, skyColor: new te, groundColor: new te};
                        break;
                    case"RectAreaLight":
                        i = {color: new te, position: new W, halfWidth: new W, halfHeight: new W}
                }
                return e[t.id] = i, i
            }
        }
    }

    let nZ = 0;

    function nK(e, t) {
        return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0)
    }

    function nJ(e, t) {
        let i = new nY, r = function () {
            let e = {};
            return {
                get: function (t) {
                    let i;
                    if (void 0 !== e[t.id]) return e[t.id];
                    switch (t.type) {
                        case"DirectionalLight":
                        case"SpotLight":
                            i = {shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new x};
                            break;
                        case"PointLight":
                            i = {
                                shadowBias: 0,
                                shadowNormalBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new x,
                                shadowCameraNear: 1,
                                shadowCameraFar: 1e3
                            }
                    }
                    return e[t.id] = i, i
                }
            }
        }(), a = {
            version: 0,
            hash: {
                directionalLength: -1,
                pointLength: -1,
                spotLength: -1,
                rectAreaLength: -1,
                hemiLength: -1,
                numDirectionalShadows: -1,
                numPointShadows: -1,
                numSpotShadows: -1,
                numSpotMaps: -1
            },
            ambient: [0, 0, 0],
            probe: [],
            directional: [],
            directionalShadow: [],
            directionalShadowMap: [],
            directionalShadowMatrix: [],
            spot: [],
            spotLightMap: [],
            spotShadow: [],
            spotShadowMap: [],
            spotLightMatrix: [],
            rectArea: [],
            rectAreaLTC1: null,
            rectAreaLTC2: null,
            point: [],
            pointShadow: [],
            pointShadowMap: [],
            pointShadowMatrix: [],
            hemi: [],
            numSpotLightShadowsWithMaps: 0
        };
        for (let e = 0; e < 9; e++) a.probe.push(new W);
        let n = new W, s = new ey, o = new ey;
        return {
            setup: function (n, s) {
                let o = 0, l = 0, h = 0;
                for (let e = 0; e < 9; e++) a.probe[e].set(0, 0, 0);
                let c = 0, u = 0, d = 0, p = 0, f = 0, m = 0, g = 0, v = 0, _ = 0, x = 0;
                n.sort(nK);
                let y = !0 === s ? Math.PI : 1;
                for (let e = 0, t = n.length; e < t; e++) {
                    let t = n[e], s = t.color, M = t.intensity, S = t.distance,
                        b = t.shadow && t.shadow.map ? t.shadow.map.texture : null;
                    if (t.isAmbientLight) o += s.r * M * y, l += s.g * M * y, h += s.b * M * y; else if (t.isLightProbe) for (let e = 0; e < 9; e++) a.probe[e].addScaledVector(t.sh.coefficients[e], M); else if (t.isDirectionalLight) {
                        let e = i.get(t);
                        if (e.color.copy(t.color).multiplyScalar(t.intensity * y), t.castShadow) {
                            let e = t.shadow, i = r.get(t);
                            i.shadowBias = e.bias, i.shadowNormalBias = e.normalBias, i.shadowRadius = e.radius, i.shadowMapSize = e.mapSize, a.directionalShadow[c] = i, a.directionalShadowMap[c] = b, a.directionalShadowMatrix[c] = t.shadow.matrix, m++
                        }
                        a.directional[c] = e, c++
                    } else if (t.isSpotLight) {
                        let e = i.get(t);
                        e.position.setFromMatrixPosition(t.matrixWorld), e.color.copy(s).multiplyScalar(M * y), e.distance = S, e.coneCos = Math.cos(t.angle), e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra)), e.decay = t.decay, a.spot[d] = e;
                        let n = t.shadow;
                        if (t.map && (a.spotLightMap[_] = t.map, _++, n.updateMatrices(t), t.castShadow && x++), a.spotLightMatrix[d] = n.matrix, t.castShadow) {
                            let e = r.get(t);
                            e.shadowBias = n.bias, e.shadowNormalBias = n.normalBias, e.shadowRadius = n.radius, e.shadowMapSize = n.mapSize, a.spotShadow[d] = e, a.spotShadowMap[d] = b, v++
                        }
                        d++
                    } else if (t.isRectAreaLight) {
                        let e = i.get(t);
                        e.color.copy(s).multiplyScalar(M), e.halfWidth.set(.5 * t.width, 0, 0), e.halfHeight.set(0, .5 * t.height, 0), a.rectArea[p] = e, p++
                    } else if (t.isPointLight) {
                        let e = i.get(t);
                        if (e.color.copy(t.color).multiplyScalar(t.intensity * y), e.distance = t.distance, e.decay = t.decay, t.castShadow) {
                            let e = t.shadow, i = r.get(t);
                            i.shadowBias = e.bias, i.shadowNormalBias = e.normalBias, i.shadowRadius = e.radius, i.shadowMapSize = e.mapSize, i.shadowCameraNear = e.camera.near, i.shadowCameraFar = e.camera.far, a.pointShadow[u] = i, a.pointShadowMap[u] = b, a.pointShadowMatrix[u] = t.shadow.matrix, g++
                        }
                        a.point[u] = e, u++
                    } else if (t.isHemisphereLight) {
                        let e = i.get(t);
                        e.skyColor.copy(t.color).multiplyScalar(M * y), e.groundColor.copy(t.groundColor).multiplyScalar(M * y), a.hemi[f] = e, f++
                    }
                }
                p > 0 && (t.isWebGL2 ? (a.rectAreaLTC1 = r9.LTC_FLOAT_1, a.rectAreaLTC2 = r9.LTC_FLOAT_2) : !0 === e.has("OES_texture_float_linear") ? (a.rectAreaLTC1 = r9.LTC_FLOAT_1, a.rectAreaLTC2 = r9.LTC_FLOAT_2) : !0 === e.has("OES_texture_half_float_linear") ? (a.rectAreaLTC1 = r9.LTC_HALF_1, a.rectAreaLTC2 = r9.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), a.ambient[0] = o, a.ambient[1] = l, a.ambient[2] = h;
                let M = a.hash;
                (M.directionalLength !== c || M.pointLength !== u || M.spotLength !== d || M.rectAreaLength !== p || M.hemiLength !== f || M.numDirectionalShadows !== m || M.numPointShadows !== g || M.numSpotShadows !== v || M.numSpotMaps !== _) && (a.directional.length = c, a.spot.length = d, a.rectArea.length = p, a.point.length = u, a.hemi.length = f, a.directionalShadow.length = m, a.directionalShadowMap.length = m, a.pointShadow.length = g, a.pointShadowMap.length = g, a.spotShadow.length = v, a.spotShadowMap.length = v, a.directionalShadowMatrix.length = m, a.pointShadowMatrix.length = g, a.spotLightMatrix.length = v + _ - x, a.spotLightMap.length = _, a.numSpotLightShadowsWithMaps = x, M.directionalLength = c, M.pointLength = u, M.spotLength = d, M.rectAreaLength = p, M.hemiLength = f, M.numDirectionalShadows = m, M.numPointShadows = g, M.numSpotShadows = v, M.numSpotMaps = _, a.version = nZ++)
            }, setupView: function (e, t) {
                let i = 0, r = 0, l = 0, h = 0, c = 0, u = t.matrixWorldInverse;
                for (let t = 0, d = e.length; t < d; t++) {
                    let d = e[t];
                    if (d.isDirectionalLight) {
                        let e = a.directional[i];
                        e.direction.setFromMatrixPosition(d.matrixWorld), n.setFromMatrixPosition(d.target.matrixWorld), e.direction.sub(n), e.direction.transformDirection(u), i++
                    } else if (d.isSpotLight) {
                        let e = a.spot[l];
                        e.position.setFromMatrixPosition(d.matrixWorld), e.position.applyMatrix4(u), e.direction.setFromMatrixPosition(d.matrixWorld), n.setFromMatrixPosition(d.target.matrixWorld), e.direction.sub(n), e.direction.transformDirection(u), l++
                    } else if (d.isRectAreaLight) {
                        let e = a.rectArea[h];
                        e.position.setFromMatrixPosition(d.matrixWorld), e.position.applyMatrix4(u), o.identity(), s.copy(d.matrixWorld), s.premultiply(u), o.extractRotation(s), e.halfWidth.set(.5 * d.width, 0, 0), e.halfHeight.set(0, .5 * d.height, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), h++
                    } else if (d.isPointLight) {
                        let e = a.point[r];
                        e.position.setFromMatrixPosition(d.matrixWorld), e.position.applyMatrix4(u), r++
                    } else if (d.isHemisphereLight) {
                        let e = a.hemi[c];
                        e.direction.setFromMatrixPosition(d.matrixWorld), e.direction.transformDirection(u), c++
                    }
                }
            }, state: a
        }
    }

    function nQ(e, t) {
        let i = new nJ(e, t), r = [], a = [];
        return {
            init: function () {
                r.length = 0, a.length = 0
            }, state: {lightsArray: r, shadowsArray: a, lights: i}, setupLights: function (e) {
                i.setup(r, e)
            }, setupLightsView: function (e) {
                i.setupView(r, e)
            }, pushLight: function (e) {
                r.push(e)
            }, pushShadow: function (e) {
                a.push(e)
            }
        }
    }

    function n$(e, t) {
        let i = new WeakMap;
        return {
            get: function (r, a = 0) {
                let n;
                let s = i.get(r);
                return void 0 === s ? (n = new nQ(e, t), i.set(r, [n])) : a >= s.length ? (n = new nQ(e, t), s.push(n)) : n = s[a], n
            }, dispose: function () {
                i = new WeakMap
            }
        }
    }

    class n0 extends e5 {
        constructor(e) {
            super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e)
        }

        copy(e) {
            return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this
        }
    }

    class n1 extends e5 {
        constructor(e) {
            super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e)
        }

        copy(e) {
            return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this
        }
    }

    let n3 = `uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;
#include <packing>
void main(){const float samples=float(VSM_SAMPLES);float mean=0.0;float squared_mean=0.0;float uvStride=samples<=1.0?0.0:2.0/(samples-1.0);float uvStart=samples<=1.0?0.0:-1.0;for(float i=0.0;i<samples;i++){float uvOffset=uvStart+i*uvStride;
#ifdef HORIZONTAL_PASS
vec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(uvOffset,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;
#else
float depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,uvOffset)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;
#endif
}mean=mean/samples;squared_mean=squared_mean/samples;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}`;

    function n2(e, t, i) {
        let r = new t$, a = new x, n = new x, s = new B, o = new n0({depthPacking: 3201}), l = new n1, h = {},
            c = i.maxTextureSize, u = {0: 1, 1: 0, 2: 2}, d = new tH({
                defines: {VSM_SAMPLES: 8},
                uniforms: {shadow_pass: {value: null}, resolution: {value: new x}, radius: {value: 4}},
                vertexShader: "void main(){gl_Position=vec4(position,1.0);}",
                fragmentShader: n3
            }), p = d.clone();
        p.defines.HORIZONTAL_PASS = 1;
        let f = new tg;
        f.setAttribute("position", new tn(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
        let m = new tI(f, d), g = this;
        this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
        let v = this.type;

        function _(t, i, r, a) {
            let n = null, s = !0 === r.isPointLight ? t.customDistanceMaterial : t.customDepthMaterial;
            if (void 0 !== s) n = s; else if (n = !0 === r.isPointLight ? l : o, e.localClippingEnabled && !0 === i.clipShadows && Array.isArray(i.clippingPlanes) && 0 !== i.clippingPlanes.length || i.displacementMap && 0 !== i.displacementScale || i.alphaMap && i.alphaTest > 0 || i.map && i.alphaTest > 0) {
                let e = n.uuid, t = i.uuid, r = h[e];
                void 0 === r && (r = {}, h[e] = r);
                let a = r[t];
                void 0 === a && (a = n.clone(), r[t] = a), n = a
            }
            if (n.visible = i.visible, n.wireframe = i.wireframe, 3 === a ? n.side = null !== i.shadowSide ? i.shadowSide : i.side : n.side = null !== i.shadowSide ? i.shadowSide : u[i.side], n.alphaMap = i.alphaMap, n.alphaTest = i.alphaTest, n.map = i.map, n.clipShadows = i.clipShadows, n.clippingPlanes = i.clippingPlanes, n.clipIntersection = i.clipIntersection, n.displacementMap = i.displacementMap, n.displacementScale = i.displacementScale, n.displacementBias = i.displacementBias, n.wireframeLinewidth = i.wireframeLinewidth, n.linewidth = i.linewidth, !0 === r.isPointLight && !0 === n.isMeshDistanceMaterial) {
                let t = e.properties.get(n);
                t.light = r
            }
            return n
        }

        this.render = function (i, o, l) {
            if (!1 === g.enabled || !1 === g.autoUpdate && !1 === g.needsUpdate || 0 === i.length) return;
            let h = e.getRenderTarget(), u = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), x = e.state;
            x.setBlending(0), x.buffers.color.setClear(1, 1, 1, 1), x.buffers.depth.setTest(!0), x.setScissorTest(!1);
            let y = 3 !== v && 3 === this.type, M = 3 === v && 3 !== this.type;
            for (let h = 0, u = i.length; h < u; h++) {
                let u = i[h], f = u.shadow;
                if (void 0 === f) {
                    console.warn("THREE.WebGLShadowMap:", u, "has no shadow.");
                    continue
                }
                if (!1 === f.autoUpdate && !1 === f.needsUpdate) continue;
                a.copy(f.mapSize);
                let g = f.getFrameExtents();
                if (a.multiply(g), n.copy(f.mapSize), (a.x > c || a.y > c) && (a.x > c && (n.x = Math.floor(c / g.x), a.x = n.x * g.x, f.mapSize.x = n.x), a.y > c && (n.y = Math.floor(c / g.y), a.y = n.y * g.y, f.mapSize.y = n.y)), null === f.map || !0 === y || !0 === M) {
                    let e = 3 !== this.type ? {minFilter: 1003, magFilter: 1003} : {};
                    null !== f.map && f.map.dispose(), f.map = new H(a.x, a.y, e), f.map.texture.name = u.name + ".shadowMap", f.camera.updateProjectionMatrix()
                }
                e.setRenderTarget(f.map), e.clear();
                let v = f.getViewportCount();
                for (let i = 0; i < v; i++) {
                    let a = f.getViewport(i);
                    s.set(n.x * a.x, n.y * a.y, n.x * a.z, n.y * a.w), x.viewport(s), f.updateMatrices(u, i), r = f.getFrustum(), function i(a, n, s, o, l) {
                        if (!1 === a.visible) return;
                        let h = a.layers.test(n.layers);
                        if (h && (a.isMesh || a.isLine || a.isPoints) && (a.castShadow || a.receiveShadow && 3 === l) && (!a.frustumCulled || r.intersectsObject(a))) {
                            a.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, a.matrixWorld);
                            let i = t.update(a), r = a.material;
                            if (Array.isArray(r)) {
                                let t = i.groups;
                                for (let n = 0, h = t.length; n < h; n++) {
                                    let h = t[n], c = r[h.materialIndex];
                                    if (c && c.visible) {
                                        let t = _(a, c, o, l);
                                        e.renderBufferDirect(s, null, i, t, a, h)
                                    }
                                }
                            } else if (r.visible) {
                                let t = _(a, r, o, l);
                                e.renderBufferDirect(s, null, i, t, a, null)
                            }
                        }
                        let c = a.children;
                        for (let e = 0, t = c.length; e < t; e++) i(c[e], n, s, o, l)
                    }(o, l, f.camera, u, this.type)
                }
                !0 !== f.isPointLightShadow && 3 === this.type && function (i, r) {
                    let n = t.update(m);
                    d.defines.VSM_SAMPLES !== i.blurSamples && (d.defines.VSM_SAMPLES = i.blurSamples, p.defines.VSM_SAMPLES = i.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), null === i.mapPass && (i.mapPass = new H(a.x, a.y)), d.uniforms.shadow_pass.value = i.map.texture, d.uniforms.resolution.value = i.mapSize, d.uniforms.radius.value = i.radius, e.setRenderTarget(i.mapPass), e.clear(), e.renderBufferDirect(r, null, n, d, m, null), p.uniforms.shadow_pass.value = i.mapPass.texture, p.uniforms.resolution.value = i.mapSize, p.uniforms.radius.value = i.radius, e.setRenderTarget(i.map), e.clear(), e.renderBufferDirect(r, null, n, p, m, null)
                }(f, l), f.needsUpdate = !1
            }
            v = this.type, g.needsUpdate = !1, e.setRenderTarget(h, u, f)
        }
    }

    function n4(e, t, i) {
        let r = i.isWebGL2, a = new function () {
                let t = !1, i = new B, r = null, a = new B(0, 0, 0, 0);
                return {
                    setMask: function (i) {
                        r === i || t || (e.colorMask(i, i, i, i), r = i)
                    }, setLocked: function (e) {
                        t = e
                    }, setClear: function (t, r, n, s, o) {
                        !0 === o && (t *= s, r *= s, n *= s), i.set(t, r, n, s), !1 === a.equals(i) && (e.clearColor(t, r, n, s), a.copy(i))
                    }, reset: function () {
                        t = !1, r = null, a.set(-1, 0, 0, 0)
                    }
                }
            }, n = new function () {
                let t = !1, i = null, r = null, a = null;
                return {
                    setTest: function (e) {
                        e ? k(2929) : H(2929)
                    }, setMask: function (r) {
                        i === r || t || (e.depthMask(r), i = r)
                    }, setFunc: function (t) {
                        if (r !== t) {
                            switch (t) {
                                case 0:
                                    e.depthFunc(512);
                                    break;
                                case 1:
                                    e.depthFunc(519);
                                    break;
                                case 2:
                                    e.depthFunc(513);
                                    break;
                                case 3:
                                default:
                                    e.depthFunc(515);
                                    break;
                                case 4:
                                    e.depthFunc(514);
                                    break;
                                case 5:
                                    e.depthFunc(518);
                                    break;
                                case 6:
                                    e.depthFunc(516);
                                    break;
                                case 7:
                                    e.depthFunc(517)
                            }
                            r = t
                        }
                    }, setLocked: function (e) {
                        t = e
                    }, setClear: function (t) {
                        a !== t && (e.clearDepth(t), a = t)
                    }, reset: function () {
                        t = !1, i = null, r = null, a = null
                    }
                }
            }, s = new function () {
                let t = !1, i = null, r = null, a = null, n = null, s = null, o = null, l = null, h = null;
                return {
                    setTest: function (e) {
                        t || (e ? k(2960) : H(2960))
                    }, setMask: function (r) {
                        i === r || t || (e.stencilMask(r), i = r)
                    }, setFunc: function (t, i, s) {
                        (r !== t || a !== i || n !== s) && (e.stencilFunc(t, i, s), r = t, a = i, n = s)
                    }, setOp: function (t, i, r) {
                        (s !== t || o !== i || l !== r) && (e.stencilOp(t, i, r), s = t, o = i, l = r)
                    }, setLocked: function (e) {
                        t = e
                    }, setClear: function (t) {
                        h !== t && (e.clearStencil(t), h = t)
                    }, reset: function () {
                        t = !1, i = null, r = null, a = null, n = null, s = null, o = null, l = null, h = null
                    }
                }
            }, o = new WeakMap, l = new WeakMap, h = {}, c = {}, u = new WeakMap, d = [], p = null, f = !1, m = null,
            g = null, v = null, _ = null, x = null, y = null, M = null, S = !1, b = null, w = null, T = null, E = null,
            A = null, C = e.getParameter(35661), L = !1, P = e.getParameter(7938);
        -1 !== P.indexOf("WebGL") ? L = parseFloat(/^WebGL (\d)/.exec(P)[1]) >= 1 : -1 !== P.indexOf("OpenGL ES") && (L = parseFloat(/^OpenGL ES (\d)/.exec(P)[1]) >= 2);
        let R = null, D = {}, U = e.getParameter(3088), I = e.getParameter(2978), N = new B().fromArray(U),
            O = new B().fromArray(I);

        function z(t, i, a, n) {
            let s = new Uint8Array(4), o = e.createTexture();
            e.bindTexture(t, o), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
            for (let o = 0; o < a; o++) r && (32879 === t || 35866 === t) ? e.texImage3D(i, 0, 6408, 1, 1, n, 0, 6408, 5121, s) : e.texImage2D(i + o, 0, 6408, 1, 1, 0, 6408, 5121, s);
            return o
        }

        let F = {};

        function k(t) {
            !0 !== h[t] && (e.enable(t), h[t] = !0)
        }

        function H(t) {
            !1 !== h[t] && (e.disable(t), h[t] = !1)
        }

        F[3553] = z(3553, 3553, 1), F[34067] = z(34067, 34069, 6), r && (F[35866] = z(35866, 35866, 1, 1), F[32879] = z(32879, 32879, 1, 1)), a.setClear(0, 0, 0, 1), n.setClear(1), s.setClear(0), k(2929), n.setFunc(3), j(!1), q(1), k(2884), W(0);
        let V = {100: 32774, 101: 32778, 102: 32779};
        if (r) V[103] = 32775, V[104] = 32776; else {
            let e = t.get("EXT_blend_minmax");
            null !== e && (V[103] = e.MIN_EXT, V[104] = e.MAX_EXT)
        }
        let G = {
            200: 0,
            201: 1,
            202: 768,
            204: 770,
            210: 776,
            208: 774,
            206: 772,
            203: 769,
            205: 771,
            209: 775,
            207: 773
        };

        function W(t, i, r, a, n, s, o, l) {
            if (0 === t) {
                !0 === f && (H(3042), f = !1);
                return
            }
            if (!1 === f && (k(3042), f = !0), 5 !== t) {
                if (t !== m || l !== S) {
                    if ((100 !== g || 100 !== x) && (e.blendEquation(32774), g = 100, x = 100), l) switch (t) {
                        case 1:
                            e.blendFuncSeparate(1, 771, 1, 771);
                            break;
                        case 2:
                            e.blendFunc(1, 1);
                            break;
                        case 3:
                            e.blendFuncSeparate(0, 769, 0, 1);
                            break;
                        case 4:
                            e.blendFuncSeparate(0, 768, 0, 770);
                            break;
                        default:
                            console.error("THREE.WebGLState: Invalid blending: ", t)
                    } else switch (t) {
                        case 1:
                            e.blendFuncSeparate(770, 771, 1, 771);
                            break;
                        case 2:
                            e.blendFunc(770, 1);
                            break;
                        case 3:
                            e.blendFuncSeparate(0, 769, 0, 1);
                            break;
                        case 4:
                            e.blendFunc(0, 768);
                            break;
                        default:
                            console.error("THREE.WebGLState: Invalid blending: ", t)
                    }
                    v = null, _ = null, y = null, M = null, m = t, S = l
                }
                return
            }
            n = n || i, s = s || r, o = o || a, (i !== g || n !== x) && (e.blendEquationSeparate(V[i], V[n]), g = i, x = n), (r !== v || a !== _ || s !== y || o !== M) && (e.blendFuncSeparate(G[r], G[a], G[s], G[o]), v = r, _ = a, y = s, M = o), m = t, S = !1
        }

        function j(t) {
            b !== t && (t ? e.frontFace(2304) : e.frontFace(2305), b = t)
        }

        function q(t) {
            0 !== t ? (k(2884), t !== w && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : H(2884), w = t
        }

        function X(t, i, r) {
            t ? (k(32823), (E !== i || A !== r) && (e.polygonOffset(i, r), E = i, A = r)) : H(32823)
        }

        return {
            buffers: {color: a, depth: n, stencil: s}, enable: k, disable: H, bindFramebuffer: function (t, i) {
                return c[t] !== i && (e.bindFramebuffer(t, i), c[t] = i, r && (36009 === t && (c[36160] = i), 36160 === t && (c[36009] = i)), !0)
            }, drawBuffers: function (r, a) {
                let n = d, s = !1;
                if (r) {
                    if (void 0 === (n = u.get(a)) && (n = [], u.set(a, n)), r.isWebGLMultipleRenderTargets) {
                        let e = r.texture;
                        if (n.length !== e.length || 36064 !== n[0]) {
                            for (let t = 0, i = e.length; t < i; t++) n[t] = 36064 + t;
                            n.length = e.length, s = !0
                        }
                    } else 36064 !== n[0] && (n[0] = 36064, s = !0)
                } else 1029 !== n[0] && (n[0] = 1029, s = !0);
                s && (i.isWebGL2 ? e.drawBuffers(n) : t.get("WEBGL_draw_buffers").drawBuffersWEBGL(n))
            }, useProgram: function (t) {
                return p !== t && (e.useProgram(t), p = t, !0)
            }, setBlending: W, setMaterial: function (e, t) {
                2 === e.side ? H(2884) : k(2884);
                let i = 1 === e.side;
                t && (i = !i), j(i), 1 === e.blending && !1 === e.transparent ? W(0) : W(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha), n.setFunc(e.depthFunc), n.setTest(e.depthTest), n.setMask(e.depthWrite), a.setMask(e.colorWrite);
                let r = e.stencilWrite;
                s.setTest(r), r && (s.setMask(e.stencilWriteMask), s.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), s.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)), X(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits), !0 === e.alphaToCoverage ? k(32926) : H(32926)
            }, setFlipSided: j, setCullFace: q, setLineWidth: function (t) {
                t !== T && (L && e.lineWidth(t), T = t)
            }, setPolygonOffset: X, setScissorTest: function (e) {
                e ? k(3089) : H(3089)
            }, activeTexture: function (t) {
                void 0 === t && (t = 33984 + C - 1), R !== t && (e.activeTexture(t), R = t)
            }, bindTexture: function (t, i, r) {
                void 0 === r && (r = null === R ? 33984 + C - 1 : R);
                let a = D[r];
                void 0 === a && (a = {
                    type: void 0,
                    texture: void 0
                }, D[r] = a), (a.type !== t || a.texture !== i) && (R !== r && (e.activeTexture(r), R = r), e.bindTexture(t, i || F[t]), a.type = t, a.texture = i)
            }, unbindTexture: function () {
                let t = D[R];
                void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0)
            }, compressedTexImage2D: function () {
                try {
                    e.compressedTexImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, compressedTexImage3D: function () {
                try {
                    e.compressedTexImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, texImage2D: function () {
                try {
                    e.texImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, texImage3D: function () {
                try {
                    e.texImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, updateUBOMapping: function (t, i) {
                let r = l.get(i);
                void 0 === r && (r = new WeakMap, l.set(i, r));
                let a = r.get(t);
                void 0 === a && (a = e.getUniformBlockIndex(i, t.name), r.set(t, a))
            }, uniformBlockBinding: function (t, i) {
                let r = l.get(i), a = r.get(t);
                o.get(i) !== a && (e.uniformBlockBinding(i, a, t.__bindingPointIndex), o.set(i, a))
            }, texStorage2D: function () {
                try {
                    e.texStorage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, texStorage3D: function () {
                try {
                    e.texStorage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, texSubImage2D: function () {
                try {
                    e.texSubImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, texSubImage3D: function () {
                try {
                    e.texSubImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, compressedTexSubImage2D: function () {
                try {
                    e.compressedTexSubImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, compressedTexSubImage3D: function () {
                try {
                    e.compressedTexSubImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            }, scissor: function (t) {
                !1 === N.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), N.copy(t))
            }, viewport: function (t) {
                !1 === O.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), O.copy(t))
            }, reset: function () {
                e.disable(3042), e.disable(2884), e.disable(2929), e.disable(32823), e.disable(3089), e.disable(2960), e.disable(32926), e.blendEquation(32774), e.blendFunc(1, 0), e.blendFuncSeparate(1, 0, 1, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(513), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(519, 0, 4294967295), e.stencilOp(7680, 7680, 7680), e.clearStencil(0), e.cullFace(1029), e.frontFace(2305), e.polygonOffset(0, 0), e.activeTexture(33984), e.bindFramebuffer(36160, null), !0 === r && (e.bindFramebuffer(36009, null), e.bindFramebuffer(36008, null)), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), h = {}, R = null, D = {}, c = {}, u = new WeakMap, d = [], p = null, f = !1, m = null, g = null, v = null, _ = null, x = null, y = null, M = null, S = !1, b = null, w = null, T = null, E = null, A = null, N.set(0, 0, e.canvas.width, e.canvas.height), O.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), n.reset(), s.reset()
            }
        }
    }

    function n5(e, t, i, r, a, l, h) {
        let c;
        let u = a.isWebGL2, d = a.maxTextures, p = a.maxCubemapSize, f = a.maxTextureSize, v = a.maxSamples,
            _ = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null,
            x = "undefined" != typeof navigator && /OculusBrowser/g.test(navigator.userAgent), y = new WeakMap,
            M = new WeakMap, S = !1;
        try {
            S = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d")
        } catch (e) {
        }

        function w(e, t) {
            return S ? new OffscreenCanvas(e, t) : b("canvas")
        }

        function T(e, t, i, r) {
            let a = 1;
            if ((e.width > r || e.height > r) && (a = r / Math.max(e.width, e.height)), a < 1 || !0 === t) {
                if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                    let r = t ? g : Math.floor, n = r(a * e.width), s = r(a * e.height);
                    void 0 === c && (c = w(n, s));
                    let o = i ? w(n, s) : c;
                    o.width = n, o.height = s;
                    let l = o.getContext("2d");
                    return l.drawImage(e, 0, 0, n, s), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + n + "x" + s + ")."), o
                }
                "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ").")
            }
            return e
        }

        function E(e) {
            return m(e.width) && m(e.height)
        }

        function A(e, t) {
            return e.generateMipmaps && t && 1003 !== e.minFilter && 1006 !== e.minFilter
        }

        function C(t) {
            e.generateMipmap(t)
        }

        function L(i, r, a, s, o = !1) {
            if (!1 === u) return r;
            if (null !== i) {
                if (void 0 !== e[i]) return e[i];
                console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + i + "'")
            }
            let l = r;
            return 6403 === r && (5126 === a && (l = 33326), 5131 === a && (l = 33325), 5121 === a && (l = 33321)), 36244 === r && (5121 === a && (l = 33330), 5123 === a && (l = 33332), 5125 === a && (l = 33334), 5120 === a && (l = 33329), 5122 === a && (l = 33331), 5124 === a && (l = 33333)), 33319 === r && (5126 === a && (l = 33328), 5131 === a && (l = 33327), 5121 === a && (l = 33323)), 6408 === r && (5126 === a && (l = 34836), 5131 === a && (l = 34842), 5121 === a && (l = s === n && !1 === o ? 35907 : 32856), 32819 === a && (l = 32854), 32820 === a && (l = 32855)), (33325 === l || 33326 === l || 33327 === l || 33328 === l || 34842 === l || 34836 === l) && t.get("EXT_color_buffer_float"), l
        }

        function P(e, t, i) {
            return !0 === A(e, i) || e.isFramebufferTexture && 1003 !== e.minFilter && 1006 !== e.minFilter ? Math.log2(Math.max(t.width, t.height)) + 1 : void 0 !== e.mipmaps && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1
        }

        function R(e) {
            return 1003 === e || 1004 === e || 1005 === e ? 9728 : 9729
        }

        function D(e) {
            let t = e.target;
            t.removeEventListener("dispose", D), function (e) {
                let t = r.get(e);
                if (void 0 === t.__webglInit) return;
                let i = e.source, a = M.get(i);
                if (a) {
                    let r = a[t.__cacheKey];
                    r.usedTimes--, 0 === r.usedTimes && N(e), 0 === Object.keys(a).length && M.delete(i)
                }
                r.remove(e)
            }(t), t.isVideoTexture && y.delete(t)
        }

        function I(t) {
            let i = t.target;
            i.removeEventListener("dispose", I), function (t) {
                let i = t.texture, a = r.get(t), n = r.get(i);
                if (void 0 !== n.__webglTexture && (e.deleteTexture(n.__webglTexture), h.memory.textures--), t.depthTexture && t.depthTexture.dispose(), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
                    if (Array.isArray(a.__webglFramebuffer[t])) for (let i = 0; i < a.__webglFramebuffer[t].length; i++) e.deleteFramebuffer(a.__webglFramebuffer[t][i]); else e.deleteFramebuffer(a.__webglFramebuffer[t]);
                    a.__webglDepthbuffer && e.deleteRenderbuffer(a.__webglDepthbuffer[t])
                } else {
                    if (Array.isArray(a.__webglFramebuffer)) for (let t = 0; t < a.__webglFramebuffer.length; t++) e.deleteFramebuffer(a.__webglFramebuffer[t]); else e.deleteFramebuffer(a.__webglFramebuffer);
                    if (a.__webglDepthbuffer && e.deleteRenderbuffer(a.__webglDepthbuffer), a.__webglMultisampledFramebuffer && e.deleteFramebuffer(a.__webglMultisampledFramebuffer), a.__webglColorRenderbuffer) for (let t = 0; t < a.__webglColorRenderbuffer.length; t++) a.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(a.__webglColorRenderbuffer[t]);
                    a.__webglDepthRenderbuffer && e.deleteRenderbuffer(a.__webglDepthRenderbuffer)
                }
                if (t.isWebGLMultipleRenderTargets) for (let t = 0, a = i.length; t < a; t++) {
                    let a = r.get(i[t]);
                    a.__webglTexture && (e.deleteTexture(a.__webglTexture), h.memory.textures--), r.remove(i[t])
                }
                r.remove(i), r.remove(t)
            }(i)
        }

        function N(t) {
            let i = r.get(t);
            e.deleteTexture(i.__webglTexture);
            let a = t.source, n = M.get(a);
            delete n[i.__cacheKey], h.memory.textures--
        }

        let O = 0;

        function z(e, t) {
            let a = r.get(e);
            if (e.isVideoTexture && function (e) {
                let t = h.render.frame;
                y.get(e) !== t && (y.set(e, t), e.update())
            }(e), !1 === e.isRenderTargetTexture && e.version > 0 && a.__version !== e.version) {
                let i = e.image;
                if (null === i) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found."); else if (!1 === i.complete) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete"); else {
                    G(a, e, t);
                    return
                }
            }
            i.bindTexture(3553, a.__webglTexture, 33984 + t)
        }

        let F = {1e3: 10497, 1001: 33071, 1002: 33648},
            B = {1003: 9728, 1004: 9984, 1005: 9986, 1006: 9729, 1007: 9985, 1008: 9987},
            k = {512: 512, 519: 519, 513: 513, 515: 515, 514: 514, 518: 518, 516: 516, 517: 517};

        function H(i, n, s) {
            if (s ? (e.texParameteri(i, 10242, F[n.wrapS]), e.texParameteri(i, 10243, F[n.wrapT]), (32879 === i || 35866 === i) && e.texParameteri(i, 32882, F[n.wrapR]), e.texParameteri(i, 10240, B[n.magFilter]), e.texParameteri(i, 10241, B[n.minFilter])) : (e.texParameteri(i, 10242, 33071), e.texParameteri(i, 10243, 33071), (32879 === i || 35866 === i) && e.texParameteri(i, 32882, 33071), (1001 !== n.wrapS || 1001 !== n.wrapT) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), e.texParameteri(i, 10240, R(n.magFilter)), e.texParameteri(i, 10241, R(n.minFilter)), 1003 !== n.minFilter && 1006 !== n.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), n.compareFunction && (e.texParameteri(i, 34892, 34894), e.texParameteri(i, 34893, k[n.compareFunction])), !0 === t.has("EXT_texture_filter_anisotropic")) {
                let s = t.get("EXT_texture_filter_anisotropic");
                1003 !== n.magFilter && (1005 === n.minFilter || 1008 === n.minFilter) && (1015 !== n.type || !1 !== t.has("OES_texture_float_linear")) && (!1 !== u || 1016 !== n.type || !1 !== t.has("OES_texture_half_float_linear")) && (n.anisotropy > 1 || r.get(n).__currentAnisotropy) && (e.texParameterf(i, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(n.anisotropy, a.getMaxAnisotropy())), r.get(n).__currentAnisotropy = n.anisotropy)
            }
        }

        function V(t, i) {
            let r = !1;
            void 0 === t.__webglInit && (t.__webglInit = !0, i.addEventListener("dispose", D));
            let a = i.source, n = M.get(a);
            void 0 === n && (n = {}, M.set(a, n));
            let s = function (e) {
                let t = [];
                return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join()
            }(i);
            if (s !== t.__cacheKey) {
                void 0 === n[s] && (n[s] = {
                    texture: e.createTexture(),
                    usedTimes: 0
                }, h.memory.textures++, r = !0), n[s].usedTimes++;
                let a = n[t.__cacheKey];
                void 0 !== a && (n[t.__cacheKey].usedTimes--, 0 === a.usedTimes && N(i)), t.__cacheKey = s, t.__webglTexture = n[s].texture
            }
            return r
        }

        function G(t, a, n) {
            let s = 3553;
            (a.isDataArrayTexture || a.isCompressedArrayTexture) && (s = 35866), a.isData3DTexture && (s = 32879);
            let o = V(t, a), h = a.source;
            i.bindTexture(s, t.__webglTexture, 33984 + n);
            let c = r.get(h);
            if (h.version !== c.__version || !0 === o) {
                let t;
                i.activeTexture(33984 + n), e.pixelStorei(37440, a.flipY), e.pixelStorei(37441, a.premultiplyAlpha), e.pixelStorei(3317, a.unpackAlignment), e.pixelStorei(37443, 0);
                let r = !u && (1001 !== a.wrapS || 1001 !== a.wrapT || 1003 !== a.minFilter && 1006 !== a.minFilter) && !1 === E(a.image),
                    d = T(a.image, r, !1, f);
                d = Z(a, d);
                let p = E(d) || u, m = l.convert(a.format, a.colorSpace), g = l.convert(a.type),
                    v = L(a.internalFormat, m, g, a.colorSpace, a.isVideoTexture);
                H(s, a, p);
                let _ = a.mipmaps, x = u && !0 !== a.isVideoTexture, y = void 0 === c.__version || !0 === o,
                    M = P(a, d, p);
                if (a.isDepthTexture) v = 6402, u ? v = 1015 === a.type ? 36012 : 1014 === a.type ? 33190 : 1020 === a.type ? 35056 : 33189 : 1015 === a.type && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), 1026 === a.format && 6402 === v && 1012 !== a.type && 1014 !== a.type && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), a.type = 1014, g = l.convert(a.type)), 1027 === a.format && 6402 === v && (v = 34041, 1020 !== a.type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), a.type = 1020, g = l.convert(a.type))), y && (x ? i.texStorage2D(3553, 1, v, d.width, d.height) : i.texImage2D(3553, 0, v, d.width, d.height, 0, m, g, null)); else if (a.isDataTexture) {
                    if (_.length > 0 && p) {
                        x && y && i.texStorage2D(3553, M, v, _[0].width, _[0].height);
                        for (let e = 0, r = _.length; e < r; e++) t = _[e], x ? i.texSubImage2D(3553, e, 0, 0, t.width, t.height, m, g, t.data) : i.texImage2D(3553, e, v, t.width, t.height, 0, m, g, t.data);
                        a.generateMipmaps = !1
                    } else x ? (y && i.texStorage2D(3553, M, v, d.width, d.height), i.texSubImage2D(3553, 0, 0, 0, d.width, d.height, m, g, d.data)) : i.texImage2D(3553, 0, v, d.width, d.height, 0, m, g, d.data)
                } else if (a.isCompressedTexture) {
                    if (a.isCompressedArrayTexture) {
                        x && y && i.texStorage3D(35866, M, v, _[0].width, _[0].height, d.depth);
                        for (let e = 0, r = _.length; e < r; e++) t = _[e], 1023 !== a.format ? null !== m ? x ? i.compressedTexSubImage3D(35866, e, 0, 0, 0, t.width, t.height, d.depth, m, t.data, 0, 0) : i.compressedTexImage3D(35866, e, v, t.width, t.height, d.depth, 0, t.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : x ? i.texSubImage3D(35866, e, 0, 0, 0, t.width, t.height, d.depth, m, g, t.data) : i.texImage3D(35866, e, v, t.width, t.height, d.depth, 0, m, g, t.data)
                    } else {
                        x && y && i.texStorage2D(3553, M, v, _[0].width, _[0].height);
                        for (let e = 0, r = _.length; e < r; e++) t = _[e], 1023 !== a.format ? null !== m ? x ? i.compressedTexSubImage2D(3553, e, 0, 0, t.width, t.height, m, t.data) : i.compressedTexImage2D(3553, e, v, t.width, t.height, 0, t.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : x ? i.texSubImage2D(3553, e, 0, 0, t.width, t.height, m, g, t.data) : i.texImage2D(3553, e, v, t.width, t.height, 0, m, g, t.data)
                    }
                } else if (a.isDataArrayTexture) x ? (y && i.texStorage3D(35866, M, v, d.width, d.height, d.depth), i.texSubImage3D(35866, 0, 0, 0, 0, d.width, d.height, d.depth, m, g, d.data)) : i.texImage3D(35866, 0, v, d.width, d.height, d.depth, 0, m, g, d.data); else if (a.isData3DTexture) x ? (y && i.texStorage3D(32879, M, v, d.width, d.height, d.depth), i.texSubImage3D(32879, 0, 0, 0, 0, d.width, d.height, d.depth, m, g, d.data)) : i.texImage3D(32879, 0, v, d.width, d.height, d.depth, 0, m, g, d.data); else if (a.isFramebufferTexture) {
                    if (y) {
                        if (x) i.texStorage2D(3553, M, v, d.width, d.height); else {
                            let e = d.width, t = d.height;
                            for (let r = 0; r < M; r++) i.texImage2D(3553, r, v, e, t, 0, m, g, null), e >>= 1, t >>= 1
                        }
                    }
                } else if (_.length > 0 && p) {
                    x && y && i.texStorage2D(3553, M, v, _[0].width, _[0].height);
                    for (let e = 0, r = _.length; e < r; e++) t = _[e], x ? i.texSubImage2D(3553, e, 0, 0, m, g, t) : i.texImage2D(3553, e, v, m, g, t);
                    a.generateMipmaps = !1
                } else x ? (y && i.texStorage2D(3553, M, v, d.width, d.height), i.texSubImage2D(3553, 0, 0, 0, m, g, d)) : i.texImage2D(3553, 0, v, m, g, d);
                A(a, p) && C(s), c.__version = h.version, a.onUpdate && a.onUpdate(a)
            }
            t.__version = a.version
        }

        function W(t, a, n, s, o, h) {
            let c = l.convert(n.format, n.colorSpace), u = l.convert(n.type),
                d = L(n.internalFormat, c, u, n.colorSpace), p = r.get(a);
            if (!p.__hasExternalTextures) {
                let e = Math.max(1, a.width >> h), t = Math.max(1, a.height >> h);
                32879 === o || 35866 === o ? i.texImage3D(o, h, d, e, t, a.depth, 0, c, u, null) : i.texImage2D(o, h, d, e, t, 0, c, u, null)
            }
            i.bindFramebuffer(36160, t), Y(a) ? _.framebufferTexture2DMultisampleEXT(36160, s, o, r.get(n).__webglTexture, 0, X(a)) : (3553 === o || o >= 34069 && o <= 34074) && e.framebufferTexture2D(36160, s, o, r.get(n).__webglTexture, h), i.bindFramebuffer(36160, null)
        }

        function j(t, i, r) {
            if (e.bindRenderbuffer(36161, t), i.depthBuffer && !i.stencilBuffer) {
                let a = 33189;
                if (r || Y(i)) {
                    let t = i.depthTexture;
                    t && t.isDepthTexture && (1015 === t.type ? a = 36012 : 1014 === t.type && (a = 33190));
                    let r = X(i);
                    Y(i) ? _.renderbufferStorageMultisampleEXT(36161, r, a, i.width, i.height) : e.renderbufferStorageMultisample(36161, r, a, i.width, i.height)
                } else e.renderbufferStorage(36161, a, i.width, i.height);
                e.framebufferRenderbuffer(36160, 36096, 36161, t)
            } else if (i.depthBuffer && i.stencilBuffer) {
                let a = X(i);
                r && !1 === Y(i) ? e.renderbufferStorageMultisample(36161, a, 35056, i.width, i.height) : Y(i) ? _.renderbufferStorageMultisampleEXT(36161, a, 35056, i.width, i.height) : e.renderbufferStorage(36161, 34041, i.width, i.height), e.framebufferRenderbuffer(36160, 33306, 36161, t)
            } else {
                let t = !0 === i.isWebGLMultipleRenderTargets ? i.texture : [i.texture];
                for (let a = 0; a < t.length; a++) {
                    let n = t[a], s = l.convert(n.format, n.colorSpace), o = l.convert(n.type),
                        h = L(n.internalFormat, s, o, n.colorSpace), c = X(i);
                    r && !1 === Y(i) ? e.renderbufferStorageMultisample(36161, c, h, i.width, i.height) : Y(i) ? _.renderbufferStorageMultisampleEXT(36161, c, h, i.width, i.height) : e.renderbufferStorage(36161, h, i.width, i.height)
                }
            }
            e.bindRenderbuffer(36161, null)
        }

        function q(t) {
            let a = r.get(t), n = !0 === t.isWebGLCubeRenderTarget;
            if (t.depthTexture && !a.__autoAllocateDepthBuffer) {
                if (n) throw Error("target.depthTexture not supported in Cube render targets");
                !function (t, a) {
                    let n = a && a.isWebGLCubeRenderTarget;
                    if (n) throw Error("Depth Texture with cube render targets is not supported");
                    if (i.bindFramebuffer(36160, t), !(a.depthTexture && a.depthTexture.isDepthTexture)) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    r.get(a.depthTexture).__webglTexture && a.depthTexture.image.width === a.width && a.depthTexture.image.height === a.height || (a.depthTexture.image.width = a.width, a.depthTexture.image.height = a.height, a.depthTexture.needsUpdate = !0), z(a.depthTexture, 0);
                    let s = r.get(a.depthTexture).__webglTexture, o = X(a);
                    if (1026 === a.depthTexture.format) Y(a) ? _.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, s, 0, o) : e.framebufferTexture2D(36160, 36096, 3553, s, 0); else if (1027 === a.depthTexture.format) Y(a) ? _.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, s, 0, o) : e.framebufferTexture2D(36160, 33306, 3553, s, 0); else throw Error("Unknown depthTexture format")
                }(a.__webglFramebuffer, t)
            } else if (n) {
                a.__webglDepthbuffer = [];
                for (let r = 0; r < 6; r++) i.bindFramebuffer(36160, a.__webglFramebuffer[r]), a.__webglDepthbuffer[r] = e.createRenderbuffer(), j(a.__webglDepthbuffer[r], t, !1)
            } else i.bindFramebuffer(36160, a.__webglFramebuffer), a.__webglDepthbuffer = e.createRenderbuffer(), j(a.__webglDepthbuffer, t, !1);
            i.bindFramebuffer(36160, null)
        }

        function X(e) {
            return Math.min(v, e.samples)
        }

        function Y(e) {
            let i = r.get(e);
            return u && e.samples > 0 && !0 === t.has("WEBGL_multisampled_render_to_texture") && !1 !== i.__useRenderToTexture
        }

        function Z(e, i) {
            let r = e.colorSpace, a = e.format, l = e.type;
            return !0 === e.isCompressedTexture || !0 === e.isVideoTexture || 1035 === e.format || r !== s && "" !== r && (r === n || r === o ? !1 === u ? !0 === t.has("EXT_sRGB") && 1023 === a ? (e.format = 1035, e.minFilter = 1006, e.generateMipmaps = !1) : i = U.sRGBToLinear(i) : (1023 !== a || 1009 !== l) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", r)), i
        }

        this.allocateTextureUnit = function () {
            let e = O;
            return e >= d && console.warn("THREE.WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + d), O += 1, e
        }, this.resetTextureUnits = function () {
            O = 0
        }, this.setTexture2D = z, this.setTexture2DArray = function (e, t) {
            let a = r.get(e);
            if (e.version > 0 && a.__version !== e.version) {
                G(a, e, t);
                return
            }
            i.bindTexture(35866, a.__webglTexture, 33984 + t)
        }, this.setTexture3D = function (e, t) {
            let a = r.get(e);
            if (e.version > 0 && a.__version !== e.version) {
                G(a, e, t);
                return
            }
            i.bindTexture(32879, a.__webglTexture, 33984 + t)
        }, this.setTextureCube = function (t, a) {
            let n = r.get(t);
            if (t.version > 0 && n.__version !== t.version) {
                (function (t, a, n) {
                    if (6 !== a.image.length) return;
                    let s = V(t, a), o = a.source;
                    i.bindTexture(34067, t.__webglTexture, 33984 + n);
                    let h = r.get(o);
                    if (o.version !== h.__version || !0 === s) {
                        let t;
                        i.activeTexture(33984 + n), e.pixelStorei(37440, a.flipY), e.pixelStorei(37441, a.premultiplyAlpha), e.pixelStorei(3317, a.unpackAlignment), e.pixelStorei(37443, 0);
                        let r = a.isCompressedTexture || a.image[0].isCompressedTexture,
                            c = a.image[0] && a.image[0].isDataTexture, d = [];
                        for (let e = 0; e < 6; e++) r || c ? d[e] = c ? a.image[e].image : a.image[e] : d[e] = T(a.image[e], !1, !0, p), d[e] = Z(a, d[e]);
                        let f = d[0], m = E(f) || u, g = l.convert(a.format, a.colorSpace), v = l.convert(a.type),
                            _ = L(a.internalFormat, g, v, a.colorSpace), x = u && !0 !== a.isVideoTexture,
                            y = void 0 === h.__version || !0 === s, M = P(a, f, m);
                        if (H(34067, a, m), r) {
                            x && y && i.texStorage2D(34067, M, _, f.width, f.height);
                            for (let e = 0; e < 6; e++) {
                                t = d[e].mipmaps;
                                for (let r = 0; r < t.length; r++) {
                                    let n = t[r];
                                    1023 !== a.format ? null !== g ? x ? i.compressedTexSubImage2D(34069 + e, r, 0, 0, n.width, n.height, g, n.data) : i.compressedTexImage2D(34069 + e, r, _, n.width, n.height, 0, n.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : x ? i.texSubImage2D(34069 + e, r, 0, 0, n.width, n.height, g, v, n.data) : i.texImage2D(34069 + e, r, _, n.width, n.height, 0, g, v, n.data)
                                }
                            }
                        } else {
                            t = a.mipmaps, x && y && (t.length > 0 && M++, i.texStorage2D(34067, M, _, d[0].width, d[0].height));
                            for (let e = 0; e < 6; e++) if (c) {
                                x ? i.texSubImage2D(34069 + e, 0, 0, 0, d[e].width, d[e].height, g, v, d[e].data) : i.texImage2D(34069 + e, 0, _, d[e].width, d[e].height, 0, g, v, d[e].data);
                                for (let r = 0; r < t.length; r++) {
                                    let a = t[r], n = a.image[e].image;
                                    x ? i.texSubImage2D(34069 + e, r + 1, 0, 0, n.width, n.height, g, v, n.data) : i.texImage2D(34069 + e, r + 1, _, n.width, n.height, 0, g, v, n.data)
                                }
                            } else {
                                x ? i.texSubImage2D(34069 + e, 0, 0, 0, g, v, d[e]) : i.texImage2D(34069 + e, 0, _, g, v, d[e]);
                                for (let r = 0; r < t.length; r++) {
                                    let a = t[r];
                                    x ? i.texSubImage2D(34069 + e, r + 1, 0, 0, g, v, a.image[e]) : i.texImage2D(34069 + e, r + 1, _, g, v, a.image[e])
                                }
                            }
                        }
                        A(a, m) && C(34067), h.__version = o.version, a.onUpdate && a.onUpdate(a)
                    }
                    t.__version = a.version
                })(n, t, a);
                return
            }
            i.bindTexture(34067, n.__webglTexture, 33984 + a)
        }, this.rebindTextures = function (e, t, i) {
            let a = r.get(e);
            void 0 !== t && W(a.__webglFramebuffer, e, e.texture, 36064, 3553, 0), void 0 !== i && q(e)
        }, this.setupRenderTarget = function (t) {
            let n = t.texture, s = r.get(t), o = r.get(n);
            t.addEventListener("dispose", I), !0 !== t.isWebGLMultipleRenderTargets && (void 0 === o.__webglTexture && (o.__webglTexture = e.createTexture()), o.__version = n.version, h.memory.textures++);
            let c = !0 === t.isWebGLCubeRenderTarget, d = !0 === t.isWebGLMultipleRenderTargets, p = E(t) || u;
            if (c) {
                s.__webglFramebuffer = [];
                for (let t = 0; t < 6; t++) if (u && n.mipmaps && n.mipmaps.length > 0) {
                    s.__webglFramebuffer[t] = [];
                    for (let i = 0; i < n.mipmaps.length; i++) s.__webglFramebuffer[t][i] = e.createFramebuffer()
                } else s.__webglFramebuffer[t] = e.createFramebuffer()
            } else {
                if (u && n.mipmaps && n.mipmaps.length > 0) {
                    s.__webglFramebuffer = [];
                    for (let t = 0; t < n.mipmaps.length; t++) s.__webglFramebuffer[t] = e.createFramebuffer()
                } else s.__webglFramebuffer = e.createFramebuffer();
                if (d) {
                    if (a.drawBuffers) {
                        let i = t.texture;
                        for (let t = 0, a = i.length; t < a; t++) {
                            let a = r.get(i[t]);
                            void 0 === a.__webglTexture && (a.__webglTexture = e.createTexture(), h.memory.textures++)
                        }
                    } else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.")
                }
                if (u && t.samples > 0 && !1 === Y(t)) {
                    let r = d ? n : [n];
                    s.__webglMultisampledFramebuffer = e.createFramebuffer(), s.__webglColorRenderbuffer = [], i.bindFramebuffer(36160, s.__webglMultisampledFramebuffer);
                    for (let i = 0; i < r.length; i++) {
                        let a = r[i];
                        s.__webglColorRenderbuffer[i] = e.createRenderbuffer(), e.bindRenderbuffer(36161, s.__webglColorRenderbuffer[i]);
                        let n = l.convert(a.format, a.colorSpace), o = l.convert(a.type),
                            h = L(a.internalFormat, n, o, a.colorSpace, !0 === t.isXRRenderTarget), c = X(t);
                        e.renderbufferStorageMultisample(36161, c, h, t.width, t.height), e.framebufferRenderbuffer(36160, 36064 + i, 36161, s.__webglColorRenderbuffer[i])
                    }
                    e.bindRenderbuffer(36161, null), t.depthBuffer && (s.__webglDepthRenderbuffer = e.createRenderbuffer(), j(s.__webglDepthRenderbuffer, t, !0)), i.bindFramebuffer(36160, null)
                }
            }
            if (c) {
                i.bindTexture(34067, o.__webglTexture), H(34067, n, p);
                for (let e = 0; e < 6; e++) if (u && n.mipmaps && n.mipmaps.length > 0) for (let i = 0; i < n.mipmaps.length; i++) W(s.__webglFramebuffer[e][i], t, n, 36064, 34069 + e, i); else W(s.__webglFramebuffer[e], t, n, 36064, 34069 + e, 0);
                A(n, p) && C(34067), i.unbindTexture()
            } else if (d) {
                let e = t.texture;
                for (let a = 0, n = e.length; a < n; a++) {
                    let n = e[a], o = r.get(n);
                    i.bindTexture(3553, o.__webglTexture), H(3553, n, p), W(s.__webglFramebuffer, t, n, 36064 + a, 3553, 0), A(n, p) && C(3553)
                }
                i.unbindTexture()
            } else {
                let e = 3553;
                if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (u ? e = t.isWebGL3DRenderTarget ? 32879 : 35866 : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), i.bindTexture(e, o.__webglTexture), H(e, n, p), u && n.mipmaps && n.mipmaps.length > 0) for (let i = 0; i < n.mipmaps.length; i++) W(s.__webglFramebuffer[i], t, n, 36064, e, i); else W(s.__webglFramebuffer, t, n, 36064, e, 0);
                A(n, p) && C(e), i.unbindTexture()
            }
            t.depthBuffer && q(t)
        }, this.updateRenderTargetMipmap = function (e) {
            let t = E(e) || u, a = !0 === e.isWebGLMultipleRenderTargets ? e.texture : [e.texture];
            for (let n = 0, s = a.length; n < s; n++) {
                let s = a[n];
                if (A(s, t)) {
                    let t = e.isWebGLCubeRenderTarget ? 34067 : 3553, a = r.get(s).__webglTexture;
                    i.bindTexture(t, a), C(t), i.unbindTexture()
                }
            }
        }, this.updateMultisampleRenderTarget = function (t) {
            if (u && t.samples > 0 && !1 === Y(t)) {
                let a = t.isWebGLMultipleRenderTargets ? t.texture : [t.texture], n = t.width, s = t.height, o = 16384,
                    l = [], h = t.stencilBuffer ? 33306 : 36096, c = r.get(t),
                    u = !0 === t.isWebGLMultipleRenderTargets;
                if (u) for (let t = 0; t < a.length; t++) i.bindFramebuffer(36160, c.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064 + t, 36161, null), i.bindFramebuffer(36160, c.__webglFramebuffer), e.framebufferTexture2D(36009, 36064 + t, 3553, null, 0);
                i.bindFramebuffer(36008, c.__webglMultisampledFramebuffer), i.bindFramebuffer(36009, c.__webglFramebuffer);
                for (let i = 0; i < a.length; i++) {
                    l.push(36064 + i), t.depthBuffer && l.push(h);
                    let d = void 0 !== c.__ignoreDepthValues && c.__ignoreDepthValues;
                    if (!1 === d && (t.depthBuffer && (o |= 256), t.stencilBuffer && (o |= 1024)), u && e.framebufferRenderbuffer(36008, 36064, 36161, c.__webglColorRenderbuffer[i]), !0 === d && (e.invalidateFramebuffer(36008, [h]), e.invalidateFramebuffer(36009, [h])), u) {
                        let t = r.get(a[i]).__webglTexture;
                        e.framebufferTexture2D(36009, 36064, 3553, t, 0)
                    }
                    e.blitFramebuffer(0, 0, n, s, 0, 0, n, s, o, 9728), x && e.invalidateFramebuffer(36008, l)
                }
                if (i.bindFramebuffer(36008, null), i.bindFramebuffer(36009, null), u) for (let t = 0; t < a.length; t++) {
                    i.bindFramebuffer(36160, c.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(36160, 36064 + t, 36161, c.__webglColorRenderbuffer[t]);
                    let n = r.get(a[t]).__webglTexture;
                    i.bindFramebuffer(36160, c.__webglFramebuffer), e.framebufferTexture2D(36009, 36064 + t, 3553, n, 0)
                }
                i.bindFramebuffer(36009, c.__webglMultisampledFramebuffer)
            }
        }, this.setupDepthRenderbuffer = q, this.setupFrameBufferTexture = W, this.useMultisampledRTT = Y
    }

    function n6(e, t, i) {
        let r = i.isWebGL2;
        return {
            convert: function (i, a = "") {
                let s;
                let l = a === n || a === o ? 1 : 0;
                if (1009 === i) return 5121;
                if (1017 === i) return 32819;
                if (1018 === i) return 32820;
                if (1010 === i) return 5120;
                if (1011 === i) return 5122;
                if (1012 === i) return 5123;
                if (1013 === i) return 5124;
                if (1014 === i) return 5125;
                if (1015 === i) return 5126;
                if (1016 === i) return r ? 5131 : null !== (s = t.get("OES_texture_half_float")) ? s.HALF_FLOAT_OES : null;
                if (1021 === i) return 6406;
                if (1023 === i) return 6408;
                if (1024 === i) return 6409;
                if (1025 === i) return 6410;
                if (1026 === i) return 6402;
                if (1027 === i) return 34041;
                if (1035 === i) return null !== (s = t.get("EXT_sRGB")) ? s.SRGB_ALPHA_EXT : null;
                if (1028 === i) return 6403;
                if (1029 === i) return 36244;
                if (1030 === i) return 33319;
                if (1031 === i) return 33320;
                if (1033 === i) return 36249;
                if (33776 === i || 33777 === i || 33778 === i || 33779 === i) {
                    if (1 === l) {
                        if (null === (s = t.get("WEBGL_compressed_texture_s3tc_srgb"))) return null;
                        if (33776 === i) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                        if (33777 === i) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                        if (33778 === i) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                        if (33779 === i) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
                    } else {
                        if (null === (s = t.get("WEBGL_compressed_texture_s3tc"))) return null;
                        if (33776 === i) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (33777 === i) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (33778 === i) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (33779 === i) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    }
                }
                if (35840 === i || 35841 === i || 35842 === i || 35843 === i) {
                    if (null === (s = t.get("WEBGL_compressed_texture_pvrtc"))) return null;
                    if (35840 === i) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (35841 === i) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (35842 === i) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (35843 === i) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                }
                if (36196 === i) return null !== (s = t.get("WEBGL_compressed_texture_etc1")) ? s.COMPRESSED_RGB_ETC1_WEBGL : null;
                if (37492 === i || 37496 === i) {
                    if (null === (s = t.get("WEBGL_compressed_texture_etc"))) return null;
                    if (37492 === i) return 1 === l ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
                    if (37496 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC
                }
                if (37808 === i || 37809 === i || 37810 === i || 37811 === i || 37812 === i || 37813 === i || 37814 === i || 37815 === i || 37816 === i || 37817 === i || 37818 === i || 37819 === i || 37820 === i || 37821 === i) {
                    if (null === (s = t.get("WEBGL_compressed_texture_astc"))) return null;
                    if (37808 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
                    if (37809 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
                    if (37810 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
                    if (37811 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
                    if (37812 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
                    if (37813 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
                    if (37814 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
                    if (37815 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
                    if (37816 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
                    if (37817 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
                    if (37818 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
                    if (37819 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
                    if (37820 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
                    if (37821 === i) return 1 === l ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR
                }
                if (36492 === i || 36494 === i || 36495 === i) {
                    if (null === (s = t.get("EXT_texture_compression_bptc"))) return null;
                    if (36492 === i) return 1 === l ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
                    if (36494 === i) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
                    if (36495 === i) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT
                }
                if (36283 === i || 36284 === i || 36285 === i || 36286 === i) {
                    if (null === (s = t.get("EXT_texture_compression_rgtc"))) return null;
                    if (36492 === i) return s.COMPRESSED_RED_RGTC1_EXT;
                    if (36284 === i) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
                    if (36285 === i) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
                    if (36286 === i) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
                }
                return 1020 === i ? r ? 34042 : null !== (s = t.get("WEBGL_depth_texture")) ? s.UNSIGNED_INT_24_8_WEBGL : null : void 0 !== e[i] ? e[i] : null
            }
        }
    }

    class n8 extends tG {
        constructor(e = []) {
            super(), this.isArrayCamera = !0, this.cameras = e
        }
    }

    class n7 extends ej {
        constructor() {
            super(), this.isGroup = !0, this.type = "Group"
        }
    }

    let n9 = {type: "move"};

    class se {
        constructor() {
            this._targetRay = null, this._grip = null, this._hand = null
        }

        getHandSpace() {
            return null === this._hand && (this._hand = new n7, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {pinching: !1}), this._hand
        }

        getTargetRaySpace() {
            return null === this._targetRay && (this._targetRay = new n7, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new W, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new W), this._targetRay
        }

        getGripSpace() {
            return null === this._grip && (this._grip = new n7, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new W, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new W), this._grip
        }

        dispatchEvent(e) {
            return null !== this._targetRay && this._targetRay.dispatchEvent(e), null !== this._grip && this._grip.dispatchEvent(e), null !== this._hand && this._hand.dispatchEvent(e), this
        }

        connect(e) {
            if (e && e.hand) {
                let t = this._hand;
                if (t) for (let i of e.hand.values()) this._getHandJoint(t, i)
            }
            return this.dispatchEvent({type: "connected", data: e}), this
        }

        disconnect(e) {
            return this.dispatchEvent({
                type: "disconnected",
                data: e
            }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this
        }

        update(e, t, i) {
            let r = null, a = null, n = null, s = this._targetRay, o = this._grip, l = this._hand;
            if (e && "visible-blurred" !== t.session.visibilityState) {
                if (l && e.hand) {
                    for (let r of (n = !0, e.hand.values())) {
                        let e = t.getJointPose(r, i), a = this._getHandJoint(l, r);
                        null !== e && (a.matrix.fromArray(e.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, a.jointRadius = e.radius), a.visible = null !== e
                    }
                    let r = l.joints["index-finger-tip"], a = l.joints["thumb-tip"],
                        s = r.position.distanceTo(a.position);
                    l.inputState.pinching && s > .025 ? (l.inputState.pinching = !1, this.dispatchEvent({
                        type: "pinchend",
                        handedness: e.handedness,
                        target: this
                    })) : !l.inputState.pinching && s <= .015 && (l.inputState.pinching = !0, this.dispatchEvent({
                        type: "pinchstart",
                        handedness: e.handedness,
                        target: this
                    }))
                } else null !== o && e.gripSpace && null !== (a = t.getPose(e.gripSpace, i)) && (o.matrix.fromArray(a.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, a.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(a.linearVelocity)) : o.hasLinearVelocity = !1, a.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(a.angularVelocity)) : o.hasAngularVelocity = !1);
                null !== s && (null === (r = t.getPose(e.targetRaySpace, i)) && null !== a && (r = a), null !== r && (s.matrix.fromArray(r.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(r.linearVelocity)) : s.hasLinearVelocity = !1, r.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(r.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(n9)))
            }
            return null !== s && (s.visible = null !== r), null !== o && (o.visible = null !== a), null !== l && (l.visible = null !== n), this
        }

        _getHandJoint(e, t) {
            if (void 0 === e.joints[t.jointName]) {
                let i = new n7;
                i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i)
            }
            return e.joints[t.jointName]
        }
    }

    class st extends F {
        constructor(e, t, i, r, a, n, s, o, l, h) {
            if (1026 !== (h = void 0 !== h ? h : 1026) && 1027 !== h) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
            void 0 === i && 1026 === h && (i = 1014), void 0 === i && 1027 === h && (i = 1020), super(null, r, a, n, s, o, h, i, l), this.isDepthTexture = !0, this.image = {
                width: e,
                height: t
            }, this.magFilter = void 0 !== s ? s : 1003, this.minFilter = void 0 !== o ? o : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null
        }

        copy(e) {
            return super.copy(e), this.compareFunction = e.compareFunction, this
        }

        toJSON(e) {
            let t = super.toJSON(e);
            return null !== this.compareFunction && (t.compareFunction = this.compareFunction), t
        }
    }

    class si extends h {
        constructor(e, t) {
            super();
            let i = this, r = null, a = 1, n = null, s = "local-floor", o = 1, l = null, h = null, c = null, u = null,
                p = null, f = null, m = t.getContextAttributes(), g = null, v = null, _ = [], x = [], y = new tG;
            y.layers.enable(1), y.viewport = new B;
            let M = new tG;
            M.layers.enable(2), M.viewport = new B;
            let S = [y, M], b = new n8;
            b.layers.enable(1), b.layers.enable(2);
            let w = null, T = null;

            function E(e) {
                let t = x.indexOf(e.inputSource);
                if (-1 === t) return;
                let i = _[t];
                void 0 !== i && (i.update(e.inputSource, e.frame, l || n), i.dispatchEvent({
                    type: e.type,
                    data: e.inputSource
                }))
            }

            function A() {
                r.removeEventListener("select", E), r.removeEventListener("selectstart", E), r.removeEventListener("selectend", E), r.removeEventListener("squeeze", E), r.removeEventListener("squeezestart", E), r.removeEventListener("squeezeend", E), r.removeEventListener("end", A), r.removeEventListener("inputsourceschange", C);
                for (let e = 0; e < _.length; e++) {
                    let t = x[e];
                    null !== t && (x[e] = null, _[e].disconnect(t))
                }
                w = null, T = null, e.setRenderTarget(g), p = null, u = null, c = null, r = null, v = null, U.stop(), i.isPresenting = !1, i.dispatchEvent({type: "sessionend"})
            }

            function C(e) {
                for (let t = 0; t < e.removed.length; t++) {
                    let i = e.removed[t], r = x.indexOf(i);
                    r >= 0 && (x[r] = null, _[r].disconnect(i))
                }
                for (let t = 0; t < e.added.length; t++) {
                    let i = e.added[t], r = x.indexOf(i);
                    if (-1 === r) {
                        for (let e = 0; e < _.length; e++) {
                            if (e >= x.length) {
                                x.push(i), r = e;
                                break
                            }
                            if (null === x[e]) {
                                x[e] = i, r = e;
                                break
                            }
                        }
                        if (-1 === r) break
                    }
                    let a = _[r];
                    a && a.connect(i)
                }
            }

            this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (e) {
                let t = _[e];
                return void 0 === t && (t = new se, _[e] = t), t.getTargetRaySpace()
            }, this.getControllerGrip = function (e) {
                let t = _[e];
                return void 0 === t && (t = new se, _[e] = t), t.getGripSpace()
            }, this.getHand = function (e) {
                let t = _[e];
                return void 0 === t && (t = new se, _[e] = t), t.getHandSpace()
            }, this.setFramebufferScaleFactor = function (e) {
                a = e, !0 === i.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
            }, this.setReferenceSpaceType = function (e) {
                s = e, !0 === i.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
            }, this.getReferenceSpace = function () {
                return l || n
            }, this.setReferenceSpace = function (e) {
                l = e
            }, this.getBaseLayer = function () {
                return null !== u ? u : p
            }, this.getBinding = function () {
                return c
            }, this.getFrame = function () {
                return f
            }, this.getSession = function () {
                return r
            }, this.setSession = async function (h) {
                if (null !== (r = h)) {
                    if (g = e.getRenderTarget(), r.addEventListener("select", E), r.addEventListener("selectstart", E), r.addEventListener("selectend", E), r.addEventListener("squeeze", E), r.addEventListener("squeezestart", E), r.addEventListener("squeezeend", E), r.addEventListener("end", A), r.addEventListener("inputsourceschange", C), !0 !== m.xrCompatible && await t.makeXRCompatible(), void 0 === r.renderState.layers || !1 === e.capabilities.isWebGL2) {
                        let i = {
                            antialias: void 0 !== r.renderState.layers || m.antialias,
                            alpha: !0,
                            depth: m.depth,
                            stencil: m.stencil,
                            framebufferScaleFactor: a
                        };
                        p = new XRWebGLLayer(r, t, i), r.updateRenderState({baseLayer: p}), v = new H(p.framebufferWidth, p.framebufferHeight, {
                            format: 1023,
                            type: 1009,
                            colorSpace: e.outputColorSpace,
                            stencilBuffer: m.stencil
                        })
                    } else {
                        let i = null, n = null, s = null;
                        m.depth && (s = m.stencil ? 35056 : 33190, i = m.stencil ? 1027 : 1026, n = m.stencil ? 1020 : 1014);
                        let o = {colorFormat: 32856, depthFormat: s, scaleFactor: a};
                        u = (c = new XRWebGLBinding(r, t)).createProjectionLayer(o), r.updateRenderState({layers: [u]}), v = new H(u.textureWidth, u.textureHeight, {
                            format: 1023,
                            type: 1009,
                            depthTexture: new st(u.textureWidth, u.textureHeight, n, void 0, void 0, void 0, void 0, void 0, void 0, i),
                            stencilBuffer: m.stencil,
                            colorSpace: e.outputColorSpace,
                            samples: m.antialias ? 4 : 0
                        });
                        let l = e.properties.get(v);
                        l.__ignoreDepthValues = u.ignoreDepthValues
                    }
                    v.isXRRenderTarget = !0, this.setFoveation(o), l = null, n = await r.requestReferenceSpace(s), U.setContext(r), U.start(), i.isPresenting = !0, i.dispatchEvent({type: "sessionstart"})
                }
            }, this.getEnvironmentBlendMode = function () {
                if (null !== r) return r.environmentBlendMode
            };
            let L = new W, P = new W;

            function R(e, t) {
                null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert()
            }

            this.updateCamera = function (e) {
                var t;
                if (null === r) return;
                b.near = M.near = y.near = e.near, b.far = M.far = y.far = e.far, (w !== b.near || T !== b.far) && (r.updateRenderState({
                    depthNear: b.near,
                    depthFar: b.far
                }), w = b.near, T = b.far);
                let i = e.parent, a = b.cameras;
                R(b, i);
                for (let e = 0; e < a.length; e++) R(a[e], i);
                2 === a.length ? function (e, t, i) {
                    L.setFromMatrixPosition(t.matrixWorld), P.setFromMatrixPosition(i.matrixWorld);
                    let r = L.distanceTo(P), a = t.projectionMatrix.elements, n = i.projectionMatrix.elements,
                        s = a[14] / (a[10] - 1), o = a[14] / (a[10] + 1), l = (a[9] + 1) / a[5], h = (a[9] - 1) / a[5],
                        c = (a[8] - 1) / a[0], u = (n[8] + 1) / n[0], d = r / (-c + u), p = -(d * c);
                    t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(p), e.translateZ(d), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert();
                    let f = s + d, m = o + d;
                    e.projectionMatrix.makePerspective(s * c - p, s * u + (r - p), l * o / m * f, h * o / m * f, f, m), e.projectionMatrixInverse.copy(e.projectionMatrix).invert()
                }(b, y, M) : b.projectionMatrix.copy(y.projectionMatrix), t = e, null === i ? t.matrix.copy(b.matrixWorld) : (t.matrix.copy(i.matrixWorld), t.matrix.invert(), t.matrix.multiply(b.matrixWorld)), t.matrix.decompose(t.position, t.quaternion, t.scale), t.updateMatrixWorld(!0), t.projectionMatrix.copy(b.projectionMatrix), t.projectionMatrixInverse.copy(b.projectionMatrixInverse), t.isPerspectiveCamera && (t.fov = 2 * d * Math.atan(1 / t.projectionMatrix.elements[5]), t.zoom = 1)
            }, this.getCamera = function () {
                return b
            }, this.getFoveation = function () {
                if (null !== u || null !== p) return o
            }, this.setFoveation = function (e) {
                o = e, null !== u && (u.fixedFoveation = e), null !== p && void 0 !== p.fixedFoveation && (p.fixedFoveation = e)
            };
            let D = null, U = new t0;
            U.setAnimationLoop(function (t, r) {
                if (h = r.getViewerPose(l || n), f = r, null !== h) {
                    let t = h.views;
                    null !== p && (e.setRenderTargetFramebuffer(v, p.framebuffer), e.setRenderTarget(v));
                    let i = !1;
                    t.length !== b.cameras.length && (b.cameras.length = 0, i = !0);
                    for (let r = 0; r < t.length; r++) {
                        let a = t[r], n = null;
                        if (null !== p) n = p.getViewport(a); else {
                            let t = c.getViewSubImage(u, a);
                            n = t.viewport, 0 === r && (e.setRenderTargetTextures(v, t.colorTexture, u.ignoreDepthValues ? void 0 : t.depthStencilTexture), e.setRenderTarget(v))
                        }
                        let s = S[r];
                        void 0 === s && ((s = new tG).layers.enable(r), s.viewport = new B, S[r] = s), s.matrix.fromArray(a.transform.matrix), s.matrix.decompose(s.position, s.quaternion, s.scale), s.projectionMatrix.fromArray(a.projectionMatrix), s.projectionMatrixInverse.copy(s.projectionMatrix).invert(), s.viewport.set(n.x, n.y, n.width, n.height), 0 === r && (b.matrix.copy(s.matrix), b.matrix.decompose(b.position, b.quaternion, b.scale)), !0 === i && b.cameras.push(s)
                    }
                }
                for (let e = 0; e < _.length; e++) {
                    let t = x[e], i = _[e];
                    null !== t && void 0 !== i && i.update(t, r, l || n)
                }
                D && D(t, r), r.detectedPlanes && i.dispatchEvent({type: "planesdetected", data: r}), f = null
            }), this.setAnimationLoop = function (e) {
                D = e
            }, this.dispose = function () {
            }
        }
    }

    function sr(e, t) {
        function i(e, t) {
            !0 === e.matrixAutoUpdate && e.updateMatrix(), t.value.copy(e.matrix)
        }

        function r(r, a) {
            r.opacity.value = a.opacity, a.color && r.diffuse.value.copy(a.color), a.emissive && r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity), a.map && (r.map.value = a.map, i(a.map, r.mapTransform)), a.alphaMap && (r.alphaMap.value = a.alphaMap, i(a.alphaMap, r.alphaMapTransform)), a.bumpMap && (r.bumpMap.value = a.bumpMap, i(a.bumpMap, r.bumpMapTransform), r.bumpScale.value = a.bumpScale, 1 === a.side && (r.bumpScale.value *= -1)), a.normalMap && (r.normalMap.value = a.normalMap, i(a.normalMap, r.normalMapTransform), r.normalScale.value.copy(a.normalScale), 1 === a.side && r.normalScale.value.negate()), a.displacementMap && (r.displacementMap.value = a.displacementMap, i(a.displacementMap, r.displacementMapTransform), r.displacementScale.value = a.displacementScale, r.displacementBias.value = a.displacementBias), a.emissiveMap && (r.emissiveMap.value = a.emissiveMap, i(a.emissiveMap, r.emissiveMapTransform)), a.specularMap && (r.specularMap.value = a.specularMap, i(a.specularMap, r.specularMapTransform)), a.alphaTest > 0 && (r.alphaTest.value = a.alphaTest);
            let n = t.get(a).envMap;
            if (n && (r.envMap.value = n, r.flipEnvMap.value = n.isCubeTexture && !1 === n.isRenderTargetTexture ? -1 : 1, r.reflectivity.value = a.reflectivity, r.ior.value = a.ior, r.refractionRatio.value = a.refractionRatio), a.lightMap) {
                r.lightMap.value = a.lightMap;
                let t = !0 === e._useLegacyLights ? Math.PI : 1;
                r.lightMapIntensity.value = a.lightMapIntensity * t, i(a.lightMap, r.lightMapTransform)
            }
            a.aoMap && (r.aoMap.value = a.aoMap, r.aoMapIntensity.value = a.aoMapIntensity, i(a.aoMap, r.aoMapTransform))
        }

        return {
            refreshFogUniforms: function (t, i) {
                i.color.getRGB(t.fogColor.value, tB(e)), i.isFog ? (t.fogNear.value = i.near, t.fogFar.value = i.far) : i.isFogExp2 && (t.fogDensity.value = i.density)
            }, refreshMaterialUniforms: function (e, a, n, s, o) {
                var l, h, c, u, d, p, f, m;
                a.isMeshBasicMaterial ? r(e, a) : a.isMeshLambertMaterial ? r(e, a) : a.isMeshToonMaterial ? (r(e, a), l = e, a.gradientMap && (l.gradientMap.value = a.gradientMap)) : a.isMeshPhongMaterial ? (r(e, a), (h = e).specular.value.copy(a.specular), h.shininess.value = Math.max(a.shininess, 1e-4)) : a.isMeshStandardMaterial ? (r(e, a), function (e, r) {
                    e.metalness.value = r.metalness, r.metalnessMap && (e.metalnessMap.value = r.metalnessMap, i(r.metalnessMap, e.metalnessMapTransform)), e.roughness.value = r.roughness, r.roughnessMap && (e.roughnessMap.value = r.roughnessMap, i(r.roughnessMap, e.roughnessMapTransform));
                    let a = t.get(r).envMap;
                    a && (e.envMapIntensity.value = r.envMapIntensity)
                }(e, a), a.isMeshPhysicalMaterial && ((c = e).ior.value = a.ior, a.sheen > 0 && (c.sheenColor.value.copy(a.sheenColor).multiplyScalar(a.sheen), c.sheenRoughness.value = a.sheenRoughness, a.sheenColorMap && (c.sheenColorMap.value = a.sheenColorMap, i(a.sheenColorMap, c.sheenColorMapTransform)), a.sheenRoughnessMap && (c.sheenRoughnessMap.value = a.sheenRoughnessMap, i(a.sheenRoughnessMap, c.sheenRoughnessMapTransform))), a.clearcoat > 0 && (c.clearcoat.value = a.clearcoat, c.clearcoatRoughness.value = a.clearcoatRoughness, a.clearcoatMap && (c.clearcoatMap.value = a.clearcoatMap, i(a.clearcoatMap, c.clearcoatMapTransform)), a.clearcoatRoughnessMap && (c.clearcoatRoughnessMap.value = a.clearcoatRoughnessMap, i(a.clearcoatRoughnessMap, c.clearcoatRoughnessMapTransform)), a.clearcoatNormalMap && (c.clearcoatNormalMap.value = a.clearcoatNormalMap, i(a.clearcoatNormalMap, c.clearcoatNormalMapTransform), c.clearcoatNormalScale.value.copy(a.clearcoatNormalScale), 1 === a.side && c.clearcoatNormalScale.value.negate())), a.iridescence > 0 && (c.iridescence.value = a.iridescence, c.iridescenceIOR.value = a.iridescenceIOR, c.iridescenceThicknessMinimum.value = a.iridescenceThicknessRange[0], c.iridescenceThicknessMaximum.value = a.iridescenceThicknessRange[1], a.iridescenceMap && (c.iridescenceMap.value = a.iridescenceMap, i(a.iridescenceMap, c.iridescenceMapTransform)), a.iridescenceThicknessMap && (c.iridescenceThicknessMap.value = a.iridescenceThicknessMap, i(a.iridescenceThicknessMap, c.iridescenceThicknessMapTransform))), a.transmission > 0 && (c.transmission.value = a.transmission, c.transmissionSamplerMap.value = o.texture, c.transmissionSamplerSize.value.set(o.width, o.height), a.transmissionMap && (c.transmissionMap.value = a.transmissionMap, i(a.transmissionMap, c.transmissionMapTransform)), c.thickness.value = a.thickness, a.thicknessMap && (c.thicknessMap.value = a.thicknessMap, i(a.thicknessMap, c.thicknessMapTransform)), c.attenuationDistance.value = a.attenuationDistance, c.attenuationColor.value.copy(a.attenuationColor)), a.anisotropy > 0 && (c.anisotropyVector.value.set(a.anisotropy * Math.cos(a.anisotropyRotation), a.anisotropy * Math.sin(a.anisotropyRotation)), a.anisotropyMap && (c.anisotropyMap.value = a.anisotropyMap, i(a.anisotropyMap, c.anisotropyMapTransform))), c.specularIntensity.value = a.specularIntensity, c.specularColor.value.copy(a.specularColor), a.specularColorMap && (c.specularColorMap.value = a.specularColorMap, i(a.specularColorMap, c.specularColorMapTransform)), a.specularIntensityMap && (c.specularIntensityMap.value = a.specularIntensityMap, i(a.specularIntensityMap, c.specularIntensityMapTransform)))) : a.isMeshMatcapMaterial ? (r(e, a), u = e, a.matcap && (u.matcap.value = a.matcap)) : a.isMeshDepthMaterial ? r(e, a) : a.isMeshDistanceMaterial ? (r(e, a), function (e, i) {
                    let r = t.get(i).light;
                    e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far
                }(e, a)) : a.isMeshNormalMaterial ? r(e, a) : a.isLineBasicMaterial ? ((d = e).diffuse.value.copy(a.color), d.opacity.value = a.opacity, a.map && (d.map.value = a.map, i(a.map, d.mapTransform)), a.isLineDashedMaterial && ((p = e).dashSize.value = a.dashSize, p.totalSize.value = a.dashSize + a.gapSize, p.scale.value = a.scale)) : a.isPointsMaterial ? ((f = e).diffuse.value.copy(a.color), f.opacity.value = a.opacity, f.size.value = a.size * n, f.scale.value = .5 * s, a.map && (f.map.value = a.map, i(a.map, f.uvTransform)), a.alphaMap && (f.alphaMap.value = a.alphaMap, i(a.alphaMap, f.alphaMapTransform)), a.alphaTest > 0 && (f.alphaTest.value = a.alphaTest)) : a.isSpriteMaterial ? ((m = e).diffuse.value.copy(a.color), m.opacity.value = a.opacity, m.rotation.value = a.rotation, a.map && (m.map.value = a.map, i(a.map, m.mapTransform)), a.alphaMap && (m.alphaMap.value = a.alphaMap, i(a.alphaMap, m.alphaMapTransform)), a.alphaTest > 0 && (m.alphaTest.value = a.alphaTest)) : a.isShadowMaterial ? (e.color.value.copy(a.color), e.opacity.value = a.opacity) : a.isShaderMaterial && (a.uniformsNeedUpdate = !1)
            }
        }
    }

    function sa(e, t, i, r) {
        let a = {}, n = {}, s = [], o = i.isWebGL2 ? e.getParameter(35375) : 0;

        function l(e) {
            let t = {boundary: 0, storage: 0};
            return "number" == typeof e ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", e), t
        }

        function h(t) {
            let i = t.target;
            i.removeEventListener("dispose", h);
            let r = s.indexOf(i.__bindingPointIndex);
            s.splice(r, 1), e.deleteBuffer(a[i.id]), delete a[i.id], delete n[i.id]
        }

        return {
            bind: function (e, t) {
                let i = t.program;
                r.uniformBlockBinding(e, i)
            }, update: function (i, c) {
                let u = a[i.id];
                void 0 === u && (function (e) {
                    let t = e.uniforms, i = 0, r = 0;
                    for (let e = 0, a = t.length; e < a; e++) {
                        let a = t[e], n = {boundary: 0, storage: 0}, s = Array.isArray(a.value) ? a.value : [a.value];
                        for (let e = 0, t = s.length; e < t; e++) {
                            let t = s[e], i = l(t);
                            n.boundary += i.boundary, n.storage += i.storage
                        }
                        if (a.__data = new Float32Array(n.storage / Float32Array.BYTES_PER_ELEMENT), a.__offset = i, e > 0) {
                            r = i % 16;
                            let e = 16 - r;
                            0 !== r && e - n.boundary < 0 && (i += 16 - r, a.__offset = i)
                        }
                        i += n.storage
                    }
                    (r = i % 16) > 0 && (i += 16 - r), e.__size = i, e.__cache = {}
                }(i), u = function (t) {
                    let i = function () {
                        for (let e = 0; e < o; e++) if (-1 === s.indexOf(e)) return s.push(e), e;
                        return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0
                    }();
                    t.__bindingPointIndex = i;
                    let r = e.createBuffer(), a = t.__size, n = t.usage;
                    return e.bindBuffer(35345, r), e.bufferData(35345, a, n), e.bindBuffer(35345, null), e.bindBufferBase(35345, i, r), r
                }(i), a[i.id] = u, i.addEventListener("dispose", h));
                let d = c.program;
                r.updateUBOMapping(i, d);
                let p = t.render.frame;
                n[i.id] !== p && (function (t) {
                    let i = a[t.id], r = t.uniforms, n = t.__cache;
                    e.bindBuffer(35345, i);
                    for (let t = 0, i = r.length; t < i; t++) {
                        let i = r[t];
                        if (!0 === function (e, t, i) {
                            let r = e.value;
                            if (void 0 === i[t]) {
                                if ("number" == typeof r) i[t] = r; else {
                                    let e = Array.isArray(r) ? r : [r], a = [];
                                    for (let t = 0; t < e.length; t++) a.push(e[t].clone());
                                    i[t] = a
                                }
                                return !0
                            }
                            if ("number" == typeof r) {
                                if (i[t] !== r) return i[t] = r, !0
                            } else {
                                let e = Array.isArray(i[t]) ? i[t] : [i[t]], a = Array.isArray(r) ? r : [r];
                                for (let t = 0; t < e.length; t++) {
                                    let i = e[t];
                                    if (!1 === i.equals(a[t])) return i.copy(a[t]), !0
                                }
                            }
                            return !1
                        }(i, t, n)) {
                            let t = i.__offset, r = Array.isArray(i.value) ? i.value : [i.value], a = 0;
                            for (let n = 0; n < r.length; n++) {
                                let s = r[n], o = l(s);
                                "number" == typeof s ? (i.__data[0] = s, e.bufferSubData(35345, t + a, i.__data)) : s.isMatrix3 ? (i.__data[0] = s.elements[0], i.__data[1] = s.elements[1], i.__data[2] = s.elements[2], i.__data[3] = s.elements[0], i.__data[4] = s.elements[3], i.__data[5] = s.elements[4], i.__data[6] = s.elements[5], i.__data[7] = s.elements[0], i.__data[8] = s.elements[6], i.__data[9] = s.elements[7], i.__data[10] = s.elements[8], i.__data[11] = s.elements[0]) : (s.toArray(i.__data, a), a += o.storage / Float32Array.BYTES_PER_ELEMENT)
                            }
                            e.bufferSubData(35345, t, i.__data)
                        }
                    }
                    e.bindBuffer(35345, null)
                }(i), n[i.id] = p)
            }, dispose: function () {
                for (let t in a) e.deleteBuffer(a[t]);
                s = [], a = {}, n = {}
            }
        }
    }

    class sn {
        constructor(e = {}) {
            let t, i, r, a, o, l, h, c, u, d, p, f, m, v, _, y, M, S, w, T, E, A, C, L, P;
            let {
                canvas: R = function () {
                    let e = b("canvas");
                    return e.style.display = "block", e
                }(),
                context: D = null,
                depth: U = !0,
                stencil: I = !0,
                alpha: N = !1,
                antialias: O = !1,
                premultipliedAlpha: z = !0,
                preserveDrawingBuffer: F = !1,
                powerPreference: k = "default",
                failIfMajorPerformanceCaveat: V = !1
            } = e;
            this.isWebGLRenderer = !0, t = null !== D ? D.getContextAttributes().alpha : N;
            let G = new Uint32Array(4), j = new Int32Array(4), q = null, X = null, Y = [], Z = [];
            this.domElement = R, this.debug = {
                checkShaderErrors: !0,
                onShaderError: null
            }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.outputColorSpace = n, this._useLegacyLights = !1, this.toneMapping = 0, this.toneMappingExposure = 1;
            let K = this, J = !1, Q = 0, $ = 0, ee = null, et = -1, ei = null, er = new B, ea = new B, en = null,
                es = new te(0), eo = 0, el = R.width, eh = R.height, ec = 1, eu = null, ed = null,
                ep = new B(0, 0, el, eh), ef = new B(0, 0, el, eh), em = !1, eg = new t$, ev = !1, e_ = !1, ex = null,
                eM = new ey, eS = new x, eb = new W,
                ew = {background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0};

            function eT() {
                return null === ee ? ec : 1
            }

            let eE = D;

            function eA(e, t) {
                for (let i = 0; i < e.length; i++) {
                    let r = e[i], a = R.getContext(r, t);
                    if (null !== a) return a
                }
                return null
            }

            try {
                if ("setAttribute" in R && R.setAttribute("data-engine", "three.js r156"), R.addEventListener("webglcontextlost", eP, !1), R.addEventListener("webglcontextrestored", eR, !1), R.addEventListener("webglcontextcreationerror", eD, !1), null === eE) {
                    let e = ["webgl2", "webgl", "experimental-webgl"];
                    if (!0 === K.isWebGL1Renderer && e.shift(), eE = eA(e, {
                        alpha: !0,
                        depth: U,
                        stencil: I,
                        antialias: O,
                        premultipliedAlpha: z,
                        preserveDrawingBuffer: F,
                        powerPreference: k,
                        failIfMajorPerformanceCaveat: V
                    }), null === eE) {
                        if (eA(e)) throw Error("Error creating WebGL context with your selected attributes.");
                        throw Error("Error creating WebGL context.")
                    }
                }
                "undefined" != typeof WebGLRenderingContext && eE instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), void 0 === eE.getShaderPrecisionFormat && (eE.getShaderPrecisionFormat = function () {
                    return {rangeMin: 1, rangeMax: 1, precision: 1}
                })
            } catch (e) {
                throw console.error("THREE.WebGLRenderer: " + e.message), e
            }

            function eC() {
                i = new ab(eE), r = new an(eE, i, e), i.init(r), C = new n6(eE, i, r), a = new n4(eE, i, r), o = new aE, l = new nG, h = new n5(eE, i, a, l, r, C, o), c = new ao(K), u = new aS(K), d = new t1(eE, r), L = new ar(eE, i, d, r), p = new aw(eE, d, o, L), f = new aP(eE, p, d, o), T = new aL(eE, r, h), M = new as(l), m = new nV(K, c, u, i, r, L, M), v = new sr(K, l), _ = new nX, y = new n$(i, r), w = new ai(K, c, u, a, f, t, z), S = new n2(K, f, r), P = new sa(eE, o, r, a), E = new aa(eE, i, o, r), A = new aT(eE, i, o, r), o.programs = m.programs, K.capabilities = r, K.extensions = i, K.properties = l, K.renderLists = _, K.shadowMap = S, K.state = a, K.info = o
            }

            eC();
            let eL = new si(K, eE);

            function eP(e) {
                e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), J = !0
            }

            function eR() {
                console.log("THREE.WebGLRenderer: Context Restored."), J = !1;
                let e = o.autoReset, t = S.enabled, i = S.autoUpdate, r = S.needsUpdate, a = S.type;
                eC(), o.autoReset = e, S.enabled = t, S.autoUpdate = i, S.needsUpdate = r, S.type = a
            }

            function eD(e) {
                console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage)
            }

            function eU(e) {
                let t = e.target;
                t.removeEventListener("dispose", eU), function (e) {
                    let t = l.get(e).programs;
                    void 0 !== t && (t.forEach(function (e) {
                        m.releaseProgram(e)
                    }), e.isShaderMaterial && m.releaseShaderCache(e))
                }(t), l.remove(t)
            }

            this.xr = eL, this.getContext = function () {
                return eE
            }, this.getContextAttributes = function () {
                return eE.getContextAttributes()
            }, this.forceContextLoss = function () {
                let e = i.get("WEBGL_lose_context");
                e && e.loseContext()
            }, this.forceContextRestore = function () {
                let e = i.get("WEBGL_lose_context");
                e && e.restoreContext()
            }, this.getPixelRatio = function () {
                return ec
            }, this.setPixelRatio = function (e) {
                void 0 !== e && (ec = e, this.setSize(el, eh, !1))
            }, this.getSize = function (e) {
                return e.set(el, eh)
            }, this.setSize = function (e, t, i = !0) {
                if (eL.isPresenting) {
                    console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
                    return
                }
                el = e, eh = t, R.width = Math.floor(e * ec), R.height = Math.floor(t * ec), !0 === i && (R.style.width = e + "px", R.style.height = t + "px"), this.setViewport(0, 0, e, t)
            }, this.getDrawingBufferSize = function (e) {
                return e.set(el * ec, eh * ec).floor()
            }, this.setDrawingBufferSize = function (e, t, i) {
                el = e, eh = t, ec = i, R.width = Math.floor(e * i), R.height = Math.floor(t * i), this.setViewport(0, 0, e, t)
            }, this.getCurrentViewport = function (e) {
                return e.copy(er)
            }, this.getViewport = function (e) {
                return e.copy(ep)
            }, this.setViewport = function (e, t, i, r) {
                e.isVector4 ? ep.set(e.x, e.y, e.z, e.w) : ep.set(e, t, i, r), a.viewport(er.copy(ep).multiplyScalar(ec).floor())
            }, this.getScissor = function (e) {
                return e.copy(ef)
            }, this.setScissor = function (e, t, i, r) {
                e.isVector4 ? ef.set(e.x, e.y, e.z, e.w) : ef.set(e, t, i, r), a.scissor(ea.copy(ef).multiplyScalar(ec).floor())
            }, this.getScissorTest = function () {
                return em
            }, this.setScissorTest = function (e) {
                a.setScissorTest(em = e)
            }, this.setOpaqueSort = function (e) {
                eu = e
            }, this.setTransparentSort = function (e) {
                ed = e
            }, this.getClearColor = function (e) {
                return e.copy(w.getClearColor())
            }, this.setClearColor = function () {
                w.setClearColor.apply(w, arguments)
            }, this.getClearAlpha = function () {
                return w.getClearAlpha()
            }, this.setClearAlpha = function () {
                w.setClearAlpha.apply(w, arguments)
            }, this.clear = function (e = !0, t = !0, i = !0) {
                let r = 0;
                if (e) {
                    let e = !1;
                    if (null !== ee) {
                        let t = ee.texture.format;
                        e = 1033 === t || 1031 === t || 1029 === t
                    }
                    if (e) {
                        let e = ee.texture.type, t = w.getClearColor(), i = w.getClearAlpha(), r = t.r, a = t.g,
                            n = t.b;
                        1009 === e || 1014 === e || 1012 === e || 1020 === e || 1017 === e || 1018 === e ? (G[0] = r, G[1] = a, G[2] = n, G[3] = i, eE.clearBufferuiv(6144, 0, G)) : (j[0] = r, j[1] = a, j[2] = n, j[3] = i, eE.clearBufferiv(6144, 0, j))
                    } else r |= 16384
                }
                t && (r |= 256), i && (r |= 1024), eE.clear(r)
            }, this.clearColor = function () {
                this.clear(!0, !1, !1)
            }, this.clearDepth = function () {
                this.clear(!1, !0, !1)
            }, this.clearStencil = function () {
                this.clear(!1, !1, !0)
            }, this.dispose = function () {
                R.removeEventListener("webglcontextlost", eP, !1), R.removeEventListener("webglcontextrestored", eR, !1), R.removeEventListener("webglcontextcreationerror", eD, !1), _.dispose(), y.dispose(), l.dispose(), c.dispose(), u.dispose(), f.dispose(), L.dispose(), P.dispose(), m.dispose(), eL.dispose(), eL.removeEventListener("sessionstart", eN), eL.removeEventListener("sessionend", eO), ex && (ex.dispose(), ex = null), ez.stop()
            }, this.renderBufferDirect = function (e, t, i, n, o, f) {
                let m;
                null === t && (t = ew);
                let g = o.isMesh && 0 > o.matrixWorld.determinant(), _ = function (e, t, i, n, o) {
                    var d, p;
                    !0 !== t.isScene && (t = ew), h.resetTextureUnits();
                    let f = t.fog, m = n.isMeshStandardMaterial ? t.environment : null,
                        g = null === ee ? K.outputColorSpace : !0 === ee.isXRRenderTarget ? ee.texture.colorSpace : s,
                        _ = (n.isMeshStandardMaterial ? u : c).get(n.envMap || m),
                        x = !0 === n.vertexColors && !!i.attributes.color && 4 === i.attributes.color.itemSize,
                        y = !!i.attributes.tangent && (!!n.normalMap || n.anisotropy > 0),
                        S = !!i.morphAttributes.position, b = !!i.morphAttributes.normal, w = !!i.morphAttributes.color,
                        E = 0;
                    n.toneMapped && (null === ee || !0 === ee.isXRRenderTarget) && (E = K.toneMapping);
                    let A = i.morphAttributes.position || i.morphAttributes.normal || i.morphAttributes.color,
                        C = void 0 !== A ? A.length : 0, L = l.get(n), R = X.state.lights;
                    if (!0 === ev && (!0 === e_ || e !== ei)) {
                        let t = e === ei && n.id === et;
                        M.setState(n, e, t)
                    }
                    let D = !1;
                    n.version === L.__version ? L.needsLights && L.lightsStateVersion !== R.state.version ? D = !0 : L.outputColorSpace !== g ? D = !0 : o.isInstancedMesh && !1 === L.instancing ? D = !0 : o.isInstancedMesh || !0 !== L.instancing ? o.isSkinnedMesh && !1 === L.skinning ? D = !0 : o.isSkinnedMesh || !0 !== L.skinning ? o.isInstancedMesh && !0 === L.instancingColor && null === o.instanceColor ? D = !0 : o.isInstancedMesh && !1 === L.instancingColor && null !== o.instanceColor ? D = !0 : L.envMap !== _ ? D = !0 : !0 === n.fog && L.fog !== f ? D = !0 : void 0 !== L.numClippingPlanes && (L.numClippingPlanes !== M.numPlanes || L.numIntersection !== M.numIntersection) ? D = !0 : L.vertexAlphas !== x ? D = !0 : L.vertexTangents !== y ? D = !0 : L.morphTargets !== S ? D = !0 : L.morphNormals !== b ? D = !0 : L.morphColors !== w ? D = !0 : L.toneMapping !== E ? D = !0 : !0 === r.isWebGL2 && L.morphTargetsCount !== C && (D = !0) : D = !0 : D = !0 : (D = !0, L.__version = n.version);
                    let U = L.currentProgram;
                    !0 === D && (U = eH(n, t, o));
                    let I = !1, N = !1, O = !1, z = U.getUniforms(), F = L.uniforms;
                    if (a.useProgram(U.program) && (I = !0, N = !0, O = !0), n.id !== et && (et = n.id, N = !0), I || ei !== e) {
                        z.setValue(eE, "projectionMatrix", e.projectionMatrix), z.setValue(eE, "viewMatrix", e.matrixWorldInverse);
                        let t = z.map.cameraPosition;
                        void 0 !== t && t.setValue(eE, eb.setFromMatrixPosition(e.matrixWorld)), r.logarithmicDepthBuffer && z.setValue(eE, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) && z.setValue(eE, "isOrthographic", !0 === e.isOrthographicCamera), ei !== e && (ei = e, N = !0, O = !0)
                    }
                    if (o.isSkinnedMesh) {
                        z.setOptional(eE, o, "bindMatrix"), z.setOptional(eE, o, "bindMatrixInverse");
                        let e = o.skeleton;
                        e && (r.floatVertexTextures ? (null === e.boneTexture && e.computeBoneTexture(), z.setValue(eE, "boneTexture", e.boneTexture, h), z.setValue(eE, "boneTextureSize", e.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))
                    }
                    let B = i.morphAttributes;
                    if ((void 0 !== B.position || void 0 !== B.normal || void 0 !== B.color && !0 === r.isWebGL2) && T.update(o, i, U), (N || L.receiveShadow !== o.receiveShadow) && (L.receiveShadow = o.receiveShadow, z.setValue(eE, "receiveShadow", o.receiveShadow)), n.isMeshGouraudMaterial && null !== n.envMap && (F.envMap.value = _, F.flipEnvMap.value = _.isCubeTexture && !1 === _.isRenderTargetTexture ? -1 : 1), N && (z.setValue(eE, "toneMappingExposure", K.toneMappingExposure), L.needsLights && (d = F, p = O, d.ambientLightColor.needsUpdate = p, d.lightProbe.needsUpdate = p, d.directionalLights.needsUpdate = p, d.directionalLightShadows.needsUpdate = p, d.pointLights.needsUpdate = p, d.pointLightShadows.needsUpdate = p, d.spotLights.needsUpdate = p, d.spotLightShadows.needsUpdate = p, d.rectAreaLights.needsUpdate = p, d.hemisphereLights.needsUpdate = p), f && !0 === n.fog && v.refreshFogUniforms(F, f), v.refreshMaterialUniforms(F, n, ec, eh, ex), nb.upload(eE, L.uniformsList, F, h)), n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (nb.upload(eE, L.uniformsList, F, h), n.uniformsNeedUpdate = !1), n.isSpriteMaterial && z.setValue(eE, "center", o.center), z.setValue(eE, "modelViewMatrix", o.modelViewMatrix), z.setValue(eE, "normalMatrix", o.normalMatrix), z.setValue(eE, "modelMatrix", o.matrixWorld), n.isShaderMaterial || n.isRawShaderMaterial) {
                        let e = n.uniformsGroups;
                        for (let t = 0, i = e.length; t < i; t++) if (r.isWebGL2) {
                            let i = e[t];
                            P.update(i, U), P.bind(i, U)
                        } else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")
                    }
                    return U
                }(e, t, i, n, o);
                a.setMaterial(n, g);
                let x = i.index, y = 1;
                if (!0 === n.wireframe) {
                    if (void 0 === (x = p.getWireframeAttribute(i))) return;
                    y = 2
                }
                let S = i.drawRange, b = i.attributes.position, w = S.start * y, C = (S.start + S.count) * y;
                null !== f && (w = Math.max(w, f.start * y), C = Math.min(C, (f.start + f.count) * y)), null !== x ? (w = Math.max(w, 0), C = Math.min(C, x.count)) : null != b && (w = Math.max(w, 0), C = Math.min(C, b.count));
                let R = C - w;
                if (R < 0 || R === 1 / 0) return;
                L.setup(o, n, _, i, x);
                let D = E;
                if (null !== x && (m = d.get(x), (D = A).setIndex(m)), o.isMesh) !0 === n.wireframe ? (a.setLineWidth(n.wireframeLinewidth * eT()), D.setMode(1)) : D.setMode(4); else if (o.isLine) {
                    let e = n.linewidth;
                    void 0 === e && (e = 1), a.setLineWidth(e * eT()), o.isLineSegments ? D.setMode(1) : o.isLineLoop ? D.setMode(2) : D.setMode(3)
                } else o.isPoints ? D.setMode(0) : o.isSprite && D.setMode(4);
                if (o.isInstancedMesh) D.renderInstances(w, R, o.count); else if (i.isInstancedBufferGeometry) {
                    let e = void 0 !== i._maxInstanceCount ? i._maxInstanceCount : 1 / 0,
                        t = Math.min(i.instanceCount, e);
                    D.renderInstances(w, R, t)
                } else D.render(w, R)
            }, this.compile = function (e, t) {
                function i(e, t, i) {
                    !0 === e.transparent && 2 === e.side && !1 === e.forceSinglePass ? (e.side = 1, e.needsUpdate = !0, eH(e, t, i), e.side = 0, e.needsUpdate = !0, eH(e, t, i), e.side = 2) : eH(e, t, i)
                }

                (X = y.get(e)).init(), Z.push(X), e.traverseVisible(function (e) {
                    e.isLight && e.layers.test(t.layers) && (X.pushLight(e), e.castShadow && X.pushShadow(e))
                }), X.setupLights(K._useLegacyLights), e.traverse(function (t) {
                    let r = t.material;
                    if (r) {
                        if (Array.isArray(r)) for (let a = 0; a < r.length; a++) {
                            let n = r[a];
                            i(n, e, t)
                        } else i(r, e, t)
                    }
                }), Z.pop(), X = null
            };
            let eI = null;

            function eN() {
                ez.stop()
            }

            function eO() {
                ez.start()
            }

            let ez = new t0;

            function eF(e, t, n, s) {
                let o = e.opaque, l = e.transmissive, c = e.transparent;
                X.setupLightsView(n), !0 === ev && M.setGlobalState(K.clippingPlanes, n), l.length > 0 && function (e, t, a, n) {
                    let s = r.isWebGL2;
                    null === ex && (ex = new H(1, 1, {
                        generateMipmaps: !0,
                        type: i.has("EXT_color_buffer_half_float") ? 1016 : 1009,
                        minFilter: 1008,
                        samples: s ? 4 : 0
                    })), K.getDrawingBufferSize(eS), s ? ex.setSize(eS.x, eS.y) : ex.setSize(g(eS.x), g(eS.y));
                    let o = K.getRenderTarget();
                    K.setRenderTarget(ex), K.getClearColor(es), (eo = K.getClearAlpha()) < 1 && K.setClearColor(16777215, .5), K.clear();
                    let l = K.toneMapping;
                    K.toneMapping = 0, eB(e, a, n), h.updateMultisampleRenderTarget(ex), h.updateRenderTargetMipmap(ex);
                    let c = !1;
                    for (let e = 0, i = t.length; e < i; e++) {
                        let i = t[e], r = i.object, s = i.geometry, o = i.material, l = i.group;
                        if (2 === o.side && r.layers.test(n.layers)) {
                            let e = o.side;
                            o.side = 1, o.needsUpdate = !0, ek(r, a, n, s, o, l), o.side = e, o.needsUpdate = !0, c = !0
                        }
                    }
                    !0 === c && (h.updateMultisampleRenderTarget(ex), h.updateRenderTargetMipmap(ex)), K.setRenderTarget(o), K.setClearColor(es, eo), K.toneMapping = l
                }(o, l, t, n), s && a.viewport(er.copy(s)), o.length > 0 && eB(o, t, n), l.length > 0 && eB(l, t, n), c.length > 0 && eB(c, t, n), a.buffers.depth.setTest(!0), a.buffers.depth.setMask(!0), a.buffers.color.setMask(!0), a.setPolygonOffset(!1)
            }

            function eB(e, t, i) {
                let r = !0 === t.isScene ? t.overrideMaterial : null;
                for (let a = 0, n = e.length; a < n; a++) {
                    let n = e[a], s = n.object, o = n.geometry, l = null === r ? n.material : r, h = n.group;
                    s.layers.test(i.layers) && ek(s, t, i, o, l, h)
                }
            }

            function ek(e, t, i, r, a, n) {
                e.onBeforeRender(K, t, i, r, a, n), e.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), a.onBeforeRender(K, t, i, r, e, n), !0 === a.transparent && 2 === a.side && !1 === a.forceSinglePass ? (a.side = 1, a.needsUpdate = !0, K.renderBufferDirect(i, t, r, a, e, n), a.side = 0, a.needsUpdate = !0, K.renderBufferDirect(i, t, r, a, e, n), a.side = 2) : K.renderBufferDirect(i, t, r, a, e, n), e.onAfterRender(K, t, i, r, a, n)
            }

            function eH(e, t, i) {
                !0 !== t.isScene && (t = ew);
                let r = l.get(e), a = X.state.lights, n = X.state.shadowsArray, s = a.state.version,
                    o = m.getParameters(e, a.state, n, t, i), h = m.getProgramCacheKey(o), d = r.programs;
                r.environment = e.isMeshStandardMaterial ? t.environment : null, r.fog = t.fog, r.envMap = (e.isMeshStandardMaterial ? u : c).get(e.envMap || r.environment), void 0 === d && (e.addEventListener("dispose", eU), d = new Map, r.programs = d);
                let p = d.get(h);
                if (void 0 !== p) {
                    if (r.currentProgram === p && r.lightsStateVersion === s) return eV(e, o), p
                } else o.uniforms = m.getUniforms(e), e.onBuild(i, o, K), e.onBeforeCompile(o, K), p = m.acquireProgram(o, h), d.set(h, p), r.uniforms = o.uniforms;
                let f = r.uniforms;
                (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (f.clippingPlanes = M.uniform), eV(e, o), r.needsLights = e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights, r.lightsStateVersion = s, r.needsLights && (f.ambientLightColor.value = a.state.ambient, f.lightProbe.value = a.state.probe, f.directionalLights.value = a.state.directional, f.directionalLightShadows.value = a.state.directionalShadow, f.spotLights.value = a.state.spot, f.spotLightShadows.value = a.state.spotShadow, f.rectAreaLights.value = a.state.rectArea, f.ltc_1.value = a.state.rectAreaLTC1, f.ltc_2.value = a.state.rectAreaLTC2, f.pointLights.value = a.state.point, f.pointLightShadows.value = a.state.pointShadow, f.hemisphereLights.value = a.state.hemi, f.directionalShadowMap.value = a.state.directionalShadowMap, f.directionalShadowMatrix.value = a.state.directionalShadowMatrix, f.spotShadowMap.value = a.state.spotShadowMap, f.spotLightMatrix.value = a.state.spotLightMatrix, f.spotLightMap.value = a.state.spotLightMap, f.pointShadowMap.value = a.state.pointShadowMap, f.pointShadowMatrix.value = a.state.pointShadowMatrix);
                let g = p.getUniforms(), v = nb.seqWithValue(g.seq, f);
                return r.currentProgram = p, r.uniformsList = v, p
            }

            function eV(e, t) {
                let i = l.get(e);
                i.outputColorSpace = t.outputColorSpace, i.instancing = t.instancing, i.instancingColor = t.instancingColor, i.skinning = t.skinning, i.morphTargets = t.morphTargets, i.morphNormals = t.morphNormals, i.morphColors = t.morphColors, i.morphTargetsCount = t.morphTargetsCount, i.numClippingPlanes = t.numClippingPlanes, i.numIntersection = t.numClipIntersection, i.vertexAlphas = t.vertexAlphas, i.vertexTangents = t.vertexTangents, i.toneMapping = t.toneMapping
            }

            ez.setAnimationLoop(function (e) {
                eI && eI(e)
            }), "undefined" != typeof self && ez.setContext(self), this.setAnimationLoop = function (e) {
                eI = e, eL.setAnimationLoop(e), null === e ? ez.stop() : ez.start()
            }, eL.addEventListener("sessionstart", eN), eL.addEventListener("sessionend", eO), this.render = function (e, t) {
                if (void 0 !== t && !0 !== t.isCamera) {
                    console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                    return
                }
                if (!0 === J) return;
                !0 === e.matrixWorldAutoUpdate && e.updateMatrixWorld(), null === t.parent && !0 === t.matrixWorldAutoUpdate && t.updateMatrixWorld(), !0 === eL.enabled && !0 === eL.isPresenting && (!0 === eL.cameraAutoUpdate && eL.updateCamera(t), t = eL.getCamera()), !0 === e.isScene && e.onBeforeRender(K, e, t, ee), (X = y.get(e, Z.length)).init(), Z.push(X), eM.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), eg.setFromProjectionMatrix(eM), e_ = this.localClippingEnabled, ev = M.init(this.clippingPlanes, e_), (q = _.get(e, Y.length)).init(), Y.push(q), function e(t, i, r, a) {
                    if (!1 === t.visible) return;
                    let n = t.layers.test(i.layers);
                    if (n) {
                        if (t.isGroup) r = t.renderOrder; else if (t.isLOD) !0 === t.autoUpdate && t.update(i); else if (t.isLight) X.pushLight(t), t.castShadow && X.pushShadow(t); else if (t.isSprite) {
                            if (!t.frustumCulled || eg.intersectsSprite(t)) {
                                a && eb.setFromMatrixPosition(t.matrixWorld).applyMatrix4(eM);
                                let e = f.update(t), i = t.material;
                                i.visible && q.push(t, e, i, r, eb.z, null)
                            }
                        } else if ((t.isMesh || t.isLine || t.isPoints) && (!t.frustumCulled || eg.intersectsObject(t))) {
                            let e = f.update(t), i = t.material;
                            if (a && (void 0 !== t.boundingSphere ? (null === t.boundingSphere && t.computeBoundingSphere(), eb.copy(t.boundingSphere.center)) : (null === e.boundingSphere && e.computeBoundingSphere(), eb.copy(e.boundingSphere.center)), eb.applyMatrix4(t.matrixWorld).applyMatrix4(eM)), Array.isArray(i)) {
                                let a = e.groups;
                                for (let n = 0, s = a.length; n < s; n++) {
                                    let s = a[n], o = i[s.materialIndex];
                                    o && o.visible && q.push(t, e, o, r, eb.z, s)
                                }
                            } else i.visible && q.push(t, e, i, r, eb.z, null)
                        }
                    }
                    let s = t.children;
                    for (let t = 0, n = s.length; t < n; t++) e(s[t], i, r, a)
                }(e, t, 0, K.sortObjects), q.finish(), !0 === K.sortObjects && q.sort(eu, ed), this.info.render.frame++, !0 === ev && M.beginShadows();
                let i = X.state.shadowsArray;
                if (S.render(i, e, t), !0 === ev && M.endShadows(), !0 === this.info.autoReset && this.info.reset(), w.render(q, e), X.setupLights(K._useLegacyLights), t.isArrayCamera) {
                    let i = t.cameras;
                    for (let t = 0, r = i.length; t < r; t++) {
                        let r = i[t];
                        eF(q, e, r, r.viewport)
                    }
                } else eF(q, e, t);
                null !== ee && (h.updateMultisampleRenderTarget(ee), h.updateRenderTargetMipmap(ee)), !0 === e.isScene && e.onAfterRender(K, e, t), L.resetDefaultState(), et = -1, ei = null, Z.pop(), X = Z.length > 0 ? Z[Z.length - 1] : null, Y.pop(), q = Y.length > 0 ? Y[Y.length - 1] : null
            }, this.getActiveCubeFace = function () {
                return Q
            }, this.getActiveMipmapLevel = function () {
                return $
            }, this.getRenderTarget = function () {
                return ee
            }, this.setRenderTargetTextures = function (e, t, r) {
                l.get(e.texture).__webglTexture = t, l.get(e.depthTexture).__webglTexture = r;
                let a = l.get(e);
                a.__hasExternalTextures = !0, a.__hasExternalTextures && (a.__autoAllocateDepthBuffer = void 0 === r, a.__autoAllocateDepthBuffer || !0 !== i.has("WEBGL_multisampled_render_to_texture") || (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), a.__useRenderToTexture = !1))
            }, this.setRenderTargetFramebuffer = function (e, t) {
                let i = l.get(e);
                i.__webglFramebuffer = t, i.__useDefaultFramebuffer = void 0 === t
            }, this.setRenderTarget = function (e, t = 0, i = 0) {
                ee = e, Q = t, $ = i;
                let n = !0, s = null, o = !1, c = !1;
                if (e) {
                    let u = l.get(e);
                    void 0 !== u.__useDefaultFramebuffer ? (a.bindFramebuffer(36160, null), n = !1) : void 0 === u.__webglFramebuffer ? h.setupRenderTarget(e) : u.__hasExternalTextures && h.rebindTextures(e, l.get(e.texture).__webglTexture, l.get(e.depthTexture).__webglTexture);
                    let d = e.texture;
                    (d.isData3DTexture || d.isDataArrayTexture || d.isCompressedArrayTexture) && (c = !0);
                    let p = l.get(e).__webglFramebuffer;
                    e.isWebGLCubeRenderTarget ? (s = Array.isArray(p[t]) ? p[t][i] : p[t], o = !0) : s = r.isWebGL2 && e.samples > 0 && !1 === h.useMultisampledRTT(e) ? l.get(e).__webglMultisampledFramebuffer : Array.isArray(p) ? p[i] : p, er.copy(e.viewport), ea.copy(e.scissor), en = e.scissorTest
                } else er.copy(ep).multiplyScalar(ec).floor(), ea.copy(ef).multiplyScalar(ec).floor(), en = em;
                let u = a.bindFramebuffer(36160, s);
                if (u && r.drawBuffers && n && a.drawBuffers(e, s), a.viewport(er), a.scissor(ea), a.setScissorTest(en), o) {
                    let r = l.get(e.texture);
                    eE.framebufferTexture2D(36160, 36064, 34069 + t, r.__webglTexture, i)
                } else if (c) {
                    let r = l.get(e.texture);
                    eE.framebufferTextureLayer(36160, 36064, r.__webglTexture, i || 0, t || 0)
                }
                et = -1
            }, this.readRenderTargetPixels = function (e, t, n, s, o, h, c) {
                if (!(e && e.isWebGLRenderTarget)) {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                    return
                }
                let u = l.get(e).__webglFramebuffer;
                if (e.isWebGLCubeRenderTarget && void 0 !== c && (u = u[c]), u) {
                    a.bindFramebuffer(36160, u);
                    try {
                        let a = e.texture, l = a.format, c = a.type;
                        if (1023 !== l && C.convert(l) !== eE.getParameter(35739)) {
                            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                            return
                        }
                        let u = 1016 === c && (i.has("EXT_color_buffer_half_float") || r.isWebGL2 && i.has("EXT_color_buffer_float"));
                        if (1009 !== c && C.convert(c) !== eE.getParameter(35738) && !(1015 === c && (r.isWebGL2 || i.has("OES_texture_float") || i.has("WEBGL_color_buffer_float"))) && !u) {
                            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                            return
                        }
                        t >= 0 && t <= e.width - s && n >= 0 && n <= e.height - o && eE.readPixels(t, n, s, o, C.convert(l), C.convert(c), h)
                    } finally {
                        let e = null !== ee ? l.get(ee).__webglFramebuffer : null;
                        a.bindFramebuffer(36160, e)
                    }
                }
            }, this.copyFramebufferToTexture = function (e, t, i = 0) {
                let r = Math.pow(2, -i), n = Math.floor(t.image.width * r), s = Math.floor(t.image.height * r);
                h.setTexture2D(t, 0), eE.copyTexSubImage2D(3553, i, 0, 0, e.x, e.y, n, s), a.unbindTexture()
            }, this.copyTextureToTexture = function (e, t, i, r = 0) {
                let n = t.image.width, s = t.image.height, o = C.convert(i.format), l = C.convert(i.type);
                h.setTexture2D(i, 0), eE.pixelStorei(37440, i.flipY), eE.pixelStorei(37441, i.premultiplyAlpha), eE.pixelStorei(3317, i.unpackAlignment), t.isDataTexture ? eE.texSubImage2D(3553, r, e.x, e.y, n, s, o, l, t.image.data) : t.isCompressedTexture ? eE.compressedTexSubImage2D(3553, r, e.x, e.y, t.mipmaps[0].width, t.mipmaps[0].height, o, t.mipmaps[0].data) : eE.texSubImage2D(3553, r, e.x, e.y, o, l, t.image), 0 === r && i.generateMipmaps && eE.generateMipmap(3553), a.unbindTexture()
            }, this.copyTextureToTexture3D = function (e, t, i, r, n = 0) {
                let s;
                if (K.isWebGL1Renderer) {
                    console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
                    return
                }
                let o = e.max.x - e.min.x + 1, l = e.max.y - e.min.y + 1, c = e.max.z - e.min.z + 1,
                    u = C.convert(r.format), d = C.convert(r.type);
                if (r.isData3DTexture) h.setTexture3D(r, 0), s = 32879; else if (r.isDataArrayTexture) h.setTexture2DArray(r, 0), s = 35866; else {
                    console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
                    return
                }
                eE.pixelStorei(37440, r.flipY), eE.pixelStorei(37441, r.premultiplyAlpha), eE.pixelStorei(3317, r.unpackAlignment);
                let p = eE.getParameter(3314), f = eE.getParameter(32878), m = eE.getParameter(3316),
                    g = eE.getParameter(3315), v = eE.getParameter(32877),
                    _ = i.isCompressedTexture ? i.mipmaps[0] : i.image;
                eE.pixelStorei(3314, _.width), eE.pixelStorei(32878, _.height), eE.pixelStorei(3316, e.min.x), eE.pixelStorei(3315, e.min.y), eE.pixelStorei(32877, e.min.z), i.isDataTexture || i.isData3DTexture ? eE.texSubImage3D(s, n, t.x, t.y, t.z, o, l, c, u, d, _.data) : i.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), eE.compressedTexSubImage3D(s, n, t.x, t.y, t.z, o, l, c, u, _.data)) : eE.texSubImage3D(s, n, t.x, t.y, t.z, o, l, c, u, d, _), eE.pixelStorei(3314, p), eE.pixelStorei(32878, f), eE.pixelStorei(3316, m), eE.pixelStorei(3315, g), eE.pixelStorei(32877, v), 0 === n && r.generateMipmaps && eE.generateMipmap(s), a.unbindTexture()
            }, this.initTexture = function (e) {
                e.isCubeTexture ? h.setTextureCube(e, 0) : e.isData3DTexture ? h.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? h.setTexture2DArray(e, 0) : h.setTexture2D(e, 0), a.unbindTexture()
            }, this.resetState = function () {
                Q = 0, $ = 0, ee = null, a.reset(), L.reset()
            }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {detail: this}))
        }

        get coordinateSystem() {
            return 2e3
        }

        get physicallyCorrectLights() {
            return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."), !this.useLegacyLights
        }

        set physicallyCorrectLights(e) {
            console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."), this.useLegacyLights = !e
        }

        get outputEncoding() {
            return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace === n ? 3001 : 3e3
        }

        set outputEncoding(e) {
            console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace = 3001 === e ? n : s
        }

        get useLegacyLights() {
            return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights
        }

        set useLegacyLights(e) {
            console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = e
        }
    }

    class ss extends ej {
        constructor() {
            super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {detail: this}))
        }

        copy(e, t) {
            return super.copy(e, t), null !== e.background && (this.background = e.background.clone()), null !== e.environment && (this.environment = e.environment.clone()), null !== e.fog && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this
        }

        toJSON(e) {
            let t = super.toJSON(e);
            return null !== this.fog && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), 1 !== this.backgroundIntensity && (t.object.backgroundIntensity = this.backgroundIntensity), t
        }
    }

    class so {
        constructor(e, t) {
            this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = void 0 !== e ? e.length / t : 0, this.usage = 35044, this.updateRange = {
                offset: 0,
                count: -1
            }, this.version = 0, this.uuid = p()
        }

        onUploadCallback() {
        }

        set needsUpdate(e) {
            !0 === e && this.version++
        }

        setUsage(e) {
            return this.usage = e, this
        }

        copy(e) {
            return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this
        }

        copyAt(e, t, i) {
            e *= this.stride, i *= t.stride;
            for (let r = 0, a = this.stride; r < a; r++) this.array[e + r] = t.array[i + r];
            return this
        }

        set(e, t = 0) {
            return this.array.set(e, t), this
        }

        clone(e) {
            void 0 === e.arrayBuffers && (e.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = p()), void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
            let t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),
                i = new this.constructor(t, this.stride);
            return i.setUsage(this.usage), i
        }

        onUpload(e) {
            return this.onUploadCallback = e, this
        }

        toJSON(e) {
            return void 0 === e.arrayBuffers && (e.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = p()), void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
                uuid: this.uuid,
                buffer: this.array.buffer._uuid,
                type: this.array.constructor.name,
                stride: this.stride
            }
        }
    }

    let sl = new W;

    class sh {
        constructor(e, t, i, r = !1) {
            this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = i, this.normalized = r
        }

        get count() {
            return this.data.count
        }

        get array() {
            return this.data.array
        }

        set needsUpdate(e) {
            this.data.needsUpdate = e
        }

        applyMatrix4(e) {
            for (let t = 0, i = this.data.count; t < i; t++) sl.fromBufferAttribute(this, t), sl.applyMatrix4(e), this.setXYZ(t, sl.x, sl.y, sl.z);
            return this
        }

        applyNormalMatrix(e) {
            for (let t = 0, i = this.count; t < i; t++) sl.fromBufferAttribute(this, t), sl.applyNormalMatrix(e), this.setXYZ(t, sl.x, sl.y, sl.z);
            return this
        }

        transformDirection(e) {
            for (let t = 0, i = this.count; t < i; t++) sl.fromBufferAttribute(this, t), sl.transformDirection(e), this.setXYZ(t, sl.x, sl.y, sl.z);
            return this
        }

        setX(e, t) {
            return this.normalized && (t = _(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this
        }

        setY(e, t) {
            return this.normalized && (t = _(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this
        }

        setZ(e, t) {
            return this.normalized && (t = _(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this
        }

        setW(e, t) {
            return this.normalized && (t = _(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this
        }

        getX(e) {
            let t = this.data.array[e * this.data.stride + this.offset];
            return this.normalized && (t = v(t, this.array)), t
        }

        getY(e) {
            let t = this.data.array[e * this.data.stride + this.offset + 1];
            return this.normalized && (t = v(t, this.array)), t
        }

        getZ(e) {
            let t = this.data.array[e * this.data.stride + this.offset + 2];
            return this.normalized && (t = v(t, this.array)), t
        }

        getW(e) {
            let t = this.data.array[e * this.data.stride + this.offset + 3];
            return this.normalized && (t = v(t, this.array)), t
        }

        setXY(e, t, i) {
            return e = e * this.data.stride + this.offset, this.normalized && (t = _(t, this.array), i = _(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = i, this
        }

        setXYZ(e, t, i, r) {
            return e = e * this.data.stride + this.offset, this.normalized && (t = _(t, this.array), i = _(i, this.array), r = _(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = i, this.data.array[e + 2] = r, this
        }

        setXYZW(e, t, i, r, a) {
            return e = e * this.data.stride + this.offset, this.normalized && (t = _(t, this.array), i = _(i, this.array), r = _(r, this.array), a = _(a, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = i, this.data.array[e + 2] = r, this.data.array[e + 3] = a, this
        }

        clone(e) {
            if (void 0 !== e) return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}), void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new sh(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
            {
                console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
                let e = [];
                for (let t = 0; t < this.count; t++) {
                    let i = t * this.data.stride + this.offset;
                    for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[i + t])
                }
                return new tn(new this.array.constructor(e), this.itemSize, this.normalized)
            }
        }

        toJSON(e) {
            if (void 0 !== e) return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}), void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
                isInterleavedBufferAttribute: !0,
                itemSize: this.itemSize,
                data: this.data.uuid,
                offset: this.offset,
                normalized: this.normalized
            };
            {
                console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
                let e = [];
                for (let t = 0; t < this.count; t++) {
                    let i = t * this.data.stride + this.offset;
                    for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[i + t])
                }
                return {
                    itemSize: this.itemSize,
                    type: this.array.constructor.name,
                    array: e,
                    normalized: this.normalized
                }
            }
        }
    }

    class sc extends e5 {
        constructor(e) {
            super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new te(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e)
        }

        copy(e) {
            return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this
        }
    }

    let su = new W, sd = new W, sp = new W, sf = new x, sm = new x, sg = new ey, sv = new W, s_ = new W, sx = new W,
        sy = new x, sM = new x, sS = new x;

    class sb extends ej {
        constructor(e) {
            if (super(), this.isSprite = !0, this.type = "Sprite", void 0 === i) {
                i = new tg;
                let e = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
                    t = new so(e, 5);
                i.setIndex([0, 1, 2, 0, 2, 3]), i.setAttribute("position", new sh(t, 3, 0, !1)), i.setAttribute("uv", new sh(t, 2, 3, !1))
            }
            this.geometry = i, this.material = void 0 !== e ? e : new sc, this.center = new x(.5, .5)
        }

        raycast(e, t) {
            let i, r;
            null === e.camera && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), sd.setFromMatrixScale(this.matrixWorld), sg.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), sp.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && sd.multiplyScalar(-sp.z);
            let a = this.material.rotation;
            0 !== a && (r = Math.cos(a), i = Math.sin(a));
            let n = this.center;
            sw(sv.set(-.5, -.5, 0), sp, n, sd, i, r), sw(s_.set(.5, -.5, 0), sp, n, sd, i, r), sw(sx.set(.5, .5, 0), sp, n, sd, i, r), sy.set(0, 0), sM.set(1, 0), sS.set(1, 1);
            let s = e.ray.intersectTriangle(sv, s_, sx, !1, su);
            if (null === s && (sw(s_.set(-.5, .5, 0), sp, n, sd, i, r), sM.set(0, 1), null === (s = e.ray.intersectTriangle(sv, sx, s_, !1, su)))) return;
            let o = e.ray.origin.distanceTo(su);
            o < e.near || o > e.far || t.push({
                distance: o,
                point: su.clone(),
                uv: e2.getInterpolation(su, sv, s_, sx, sy, sM, sS, new x),
                face: null,
                object: this
            })
        }

        copy(e, t) {
            return super.copy(e, t), void 0 !== e.center && this.center.copy(e.center), this.material = e.material, this
        }
    }

    function sw(e, t, i, r, a, n) {
        sf.subVectors(e, i).addScalar(.5).multiply(r), void 0 !== a ? (sm.x = n * sf.x - a * sf.y, sm.y = a * sf.x + n * sf.y) : sm.copy(sf), e.copy(t), e.x += sm.x, e.y += sm.y, e.applyMatrix4(sg)
    }

    class sT extends F {
        constructor(e, t, i, r, a, n, s, o, l) {
            super(e, t, i, r, a, n, s, o, l), this.isCanvasTexture = !0, this.needsUpdate = !0
        }
    }

    class sE extends e5 {
        constructor(e) {
            super(), this.isMeshStandardMaterial = !0, this.defines = {STANDARD: ""}, this.type = "MeshStandardMaterial", this.color = new te(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new te(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new x(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e)
        }

        copy(e) {
            return super.copy(e), this.defines = {STANDARD: ""}, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this
        }
    }

    class sA extends ej {
        constructor(e, t = 1) {
            super(), this.isLight = !0, this.type = "Light", this.color = new te(e), this.intensity = t
        }

        dispose() {
        }

        copy(e, t) {
            return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this
        }

        toJSON(e) {
            let t = super.toJSON(e);
            return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (t.object.distance = this.distance), void 0 !== this.angle && (t.object.angle = this.angle), void 0 !== this.decay && (t.object.decay = this.decay), void 0 !== this.penumbra && (t.object.penumbra = this.penumbra), void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()), t
        }
    }

    let sC = new ey, sL = new W, sP = new W;

    class sR {
        constructor(e) {
            this.camera = e, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new x(512, 512), this.map = null, this.mapPass = null, this.matrix = new ey, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new t$, this._frameExtents = new x(1, 1), this._viewportCount = 1, this._viewports = [new B(0, 0, 1, 1)]
        }

        getViewportCount() {
            return this._viewportCount
        }

        getFrustum() {
            return this._frustum
        }

        updateMatrices(e) {
            let t = this.camera, i = this.matrix;
            sL.setFromMatrixPosition(e.matrixWorld), t.position.copy(sL), sP.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(sP), t.updateMatrixWorld(), sC.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(sC), i.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), i.multiply(sC)
        }

        getViewport(e) {
            return this._viewports[e]
        }

        getFrameExtents() {
            return this._frameExtents
        }

        dispose() {
            this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose()
        }

        copy(e) {
            return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this
        }

        clone() {
            return new this.constructor().copy(this)
        }

        toJSON() {
            let e = {};
            return 0 !== this.bias && (e.bias = this.bias), 0 !== this.normalBias && (e.normalBias = this.normalBias), 1 !== this.radius && (e.radius = this.radius), (512 !== this.mapSize.x || 512 !== this.mapSize.y) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e
        }
    }

    let sD = new ey, sU = new W, sI = new W;

    class sN extends sR {
        constructor() {
            super(new tG(90, 1, .5, 500)), this.isPointLightShadow = !0, this._frameExtents = new x(4, 2), this._viewportCount = 6, this._viewports = [new B(2, 1, 1, 1), new B(0, 1, 1, 1), new B(3, 1, 1, 1), new B(1, 1, 1, 1), new B(3, 0, 1, 1), new B(1, 0, 1, 1)], this._cubeDirections = [new W(1, 0, 0), new W(-1, 0, 0), new W(0, 0, 1), new W(0, 0, -1), new W(0, 1, 0), new W(0, -1, 0)], this._cubeUps = [new W(0, 1, 0), new W(0, 1, 0), new W(0, 1, 0), new W(0, 1, 0), new W(0, 0, 1), new W(0, 0, -1)]
        }

        updateMatrices(e, t = 0) {
            let i = this.camera, r = this.matrix, a = e.distance || i.far;
            a !== i.far && (i.far = a, i.updateProjectionMatrix()), sU.setFromMatrixPosition(e.matrixWorld), i.position.copy(sU), sI.copy(i.position), sI.add(this._cubeDirections[t]), i.up.copy(this._cubeUps[t]), i.lookAt(sI), i.updateMatrixWorld(), r.makeTranslation(-sU.x, -sU.y, -sU.z), sD.multiplyMatrices(i.projectionMatrix, i.matrixWorldInverse), this._frustum.setFromProjectionMatrix(sD)
        }
    }

    class sO extends sA {
        constructor(e, t, i = 0, r = 2) {
            super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = i, this.decay = r, this.shadow = new sN
        }

        get power() {
            return 4 * this.intensity * Math.PI
        }

        set power(e) {
            this.intensity = e / (4 * Math.PI)
        }

        dispose() {
            this.shadow.dispose()
        }

        copy(e, t) {
            return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this
        }
    }

    class sz extends sA {
        constructor(e, t) {
            super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight"
        }
    }

    class sF {
        constructor(e = !0) {
            this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
        }

        start() {
            this.startTime = sB(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
        }

        stop() {
            this.getElapsedTime(), this.running = !1, this.autoStart = !1
        }

        getElapsedTime() {
            return this.getDelta(), this.elapsedTime
        }

        getDelta() {
            let e = 0;
            if (this.autoStart && !this.running) return this.start(), 0;
            if (this.running) {
                let t = sB();
                e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e
            }
            return e
        }
    }

    function sB() {
        return ("undefined" == typeof performance ? Date : performance).now()
    }

    class sk {
        constructor(e = 1, t = 0, i = 0) {
            return this.radius = e, this.phi = t, this.theta = i, this
        }

        set(e, t, i) {
            return this.radius = e, this.phi = t, this.theta = i, this
        }

        copy(e) {
            return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this
        }

        makeSafe() {
            return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this
        }

        setFromVector3(e) {
            return this.setFromCartesianCoords(e.x, e.y, e.z)
        }

        setFromCartesianCoords(e, t, i) {
            return this.radius = Math.sqrt(e * e + t * t + i * i), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, i), this.phi = Math.acos(f(t / this.radius, -1, 1))), this
        }

        clone() {
            return new this.constructor().copy(this)
        }
    }

    function sH(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function sV(e, t, i, r, a, n, s, o) {
        let l = (e, t, i, r) => [new x(e / s, 1 - r / o), new x(i / s, 1 - r / o), new x(i / s, 1 - t / o), new x(e / s, 1 - t / o)],
            h = l(t + n, i, t + r + n, i + n), c = l(t + r + n, i, t + 2 * r + n, i + n),
            u = l(t, i + n, t + n, i + n + a), d = l(t + n, i + n, t + r + n, i + n + a),
            p = l(t + r + n, i + n, t + r + 2 * n, i + a + n),
            f = l(t + r + 2 * n, i + n, t + 2 * r + 2 * n, i + a + n), m = e.attributes.uv,
            g = [p[3], p[2], p[0], p[1]], v = [u[3], u[2], u[0], u[1]], _ = [h[3], h[2], h[0], h[1]],
            y = [c[0], c[1], c[3], c[2]], M = [d[3], d[2], d[0], d[1]], S = [f[3], f[2], f[0], f[1]], b = [];
        for (let e of [g, v, _, y, M, S]) for (let t of e) b.push(t.x, t.y);
        m.set(new Float32Array(b)), m.needsUpdate = !0
    }

    function sG(e, t, i, r, a, n) {
        sV(e, t, i, r, a, n, 64, 64)
    }

    function sW(e, t, i, r, a, n) {
        sV(e, t, i, r, a, n, 64, 32)
    }

    class sj extends n7 {
        constructor(e, t) {
            super(), sH(this, "innerLayer", void 0), sH(this, "outerLayer", void 0), this.innerLayer = e, this.outerLayer = t, e.name = "inner", t.name = "outer"
        }
    }

    class sq extends n7 {
        get map() {
            return this._map
        }

        set map(e) {
            this._map = e, this.layer1Material.map = e, this.layer1Material.needsUpdate = !0, this.layer1MaterialBiased.map = e, this.layer1MaterialBiased.needsUpdate = !0, this.layer2Material.map = e, this.layer2Material.needsUpdate = !0, this.layer2MaterialBiased.map = e, this.layer2MaterialBiased.needsUpdate = !0
        }

        get modelType() {
            return this.slim ? "slim" : "default"
        }

        set modelType(e) {
            this.slim = "slim" === e, this.modelListeners.forEach(e => e())
        }

        getBodyParts() {
            return this.children.filter(e => e instanceof sj)
        }

        setInnerLayerVisible(e) {
            this.getBodyParts().forEach(t => t.innerLayer.visible = e)
        }

        setOuterLayerVisible(e) {
            this.getBodyParts().forEach(t => t.outerLayer.visible = e)
        }

        resetJoints() {
            this.head.rotation.set(0, 0, 0), this.leftArm.rotation.set(0, 0, 0), this.rightArm.rotation.set(0, 0, 0), this.leftLeg.rotation.set(0, 0, 0), this.rightLeg.rotation.set(0, 0, 0)
        }

        constructor() {
            super(), sH(this, "head", void 0), sH(this, "body", void 0), sH(this, "rightArm", void 0), sH(this, "leftArm", void 0), sH(this, "rightLeg", void 0), sH(this, "leftLeg", void 0), sH(this, "modelListeners", []), sH(this, "slim", !1), sH(this, "_map", null), sH(this, "layer1Material", void 0), sH(this, "layer1MaterialBiased", void 0), sH(this, "layer2Material", void 0), sH(this, "layer2MaterialBiased", void 0), this.layer1Material = new sE({side: 0}), this.layer2Material = new sE({
                side: 2,
                transparent: !0,
                alphaTest: 1e-5
            }), this.layer1MaterialBiased = this.layer1Material.clone(), this.layer1MaterialBiased.polygonOffset = !0, this.layer1MaterialBiased.polygonOffsetFactor = 1, this.layer1MaterialBiased.polygonOffsetUnits = 1, this.layer2MaterialBiased = this.layer2Material.clone(), this.layer2MaterialBiased.polygonOffset = !0, this.layer2MaterialBiased.polygonOffsetFactor = 1, this.layer2MaterialBiased.polygonOffsetUnits = 1;
            let e = new tO(8, 8, 8);
            sG(e, 0, 0, 8, 8, 8);
            let t = new tI(e, this.layer1Material), i = new tO(9, 9, 9);
            sG(i, 32, 0, 8, 8, 8);
            let r = new tI(i, this.layer2Material);
            this.head = new sj(t, r), this.head.name = "head", this.head.add(t, r), t.position.y = 4, r.position.y = 4, this.add(this.head);
            let a = new tO(8, 12, 4);
            sG(a, 16, 16, 8, 12, 4);
            let n = new tI(a, this.layer1Material), s = new tO(8.5, 12.5, 4.5);
            sG(s, 16, 32, 8, 12, 4);
            let o = new tI(s, this.layer2Material);
            this.body = new sj(n, o), this.body.name = "body", this.body.add(n, o), this.body.position.y = -6, this.add(this.body);
            let l = new tO, h = new tI(l, this.layer1MaterialBiased);
            this.modelListeners.push(() => {
                h.scale.x = this.slim ? 3 : 4, h.scale.y = 12, h.scale.z = 4, sG(l, 40, 16, this.slim ? 3 : 4, 12, 4)
            });
            let c = new tO, u = new tI(c, this.layer2MaterialBiased);
            this.modelListeners.push(() => {
                u.scale.x = this.slim ? 3.5 : 4.5, u.scale.y = 12.5, u.scale.z = 4.5, sG(c, 40, 32, this.slim ? 3 : 4, 12, 4)
            });
            let d = new n7;
            d.add(h, u), this.modelListeners.push(() => {
                d.position.x = this.slim ? -.5 : -1
            }), d.position.y = -4, this.rightArm = new sj(h, u), this.rightArm.name = "rightArm", this.rightArm.add(d), this.rightArm.position.x = -5, this.rightArm.position.y = -2, this.add(this.rightArm);
            let p = new tO, f = new tI(p, this.layer1MaterialBiased);
            this.modelListeners.push(() => {
                f.scale.x = this.slim ? 3 : 4, f.scale.y = 12, f.scale.z = 4, sG(p, 32, 48, this.slim ? 3 : 4, 12, 4)
            });
            let m = new tO, g = new tI(m, this.layer2MaterialBiased);
            this.modelListeners.push(() => {
                g.scale.x = this.slim ? 3.5 : 4.5, g.scale.y = 12.5, g.scale.z = 4.5, sG(m, 48, 48, this.slim ? 3 : 4, 12, 4)
            });
            let v = new n7;
            v.add(f, g), this.modelListeners.push(() => {
                v.position.x = this.slim ? .5 : 1
            }), v.position.y = -4, this.leftArm = new sj(f, g), this.leftArm.name = "leftArm", this.leftArm.add(v), this.leftArm.position.x = 5, this.leftArm.position.y = -2, this.add(this.leftArm);
            let _ = new tO(4, 12, 4);
            sG(_, 0, 16, 4, 12, 4);
            let x = new tI(_, this.layer1MaterialBiased), y = new tO(4.5, 12.5, 4.5);
            sG(y, 0, 32, 4, 12, 4);
            let M = new tI(y, this.layer2MaterialBiased), S = new n7;
            S.add(x, M), S.position.y = -6, this.rightLeg = new sj(x, M), this.rightLeg.name = "rightLeg", this.rightLeg.add(S), this.rightLeg.position.x = -1.9, this.rightLeg.position.y = -12, this.rightLeg.position.z = -.1, this.add(this.rightLeg);
            let b = new tO(4, 12, 4);
            sG(b, 16, 48, 4, 12, 4);
            let w = new tI(b, this.layer1MaterialBiased), T = new tO(4.5, 12.5, 4.5);
            sG(T, 0, 48, 4, 12, 4);
            let E = new tI(T, this.layer2MaterialBiased), A = new n7;
            A.add(w, E), A.position.y = -6, this.leftLeg = new sj(w, E), this.leftLeg.name = "leftLeg", this.leftLeg.add(A), this.leftLeg.position.x = 1.9, this.leftLeg.position.y = -12, this.leftLeg.position.z = -.1, this.add(this.leftLeg), this.modelType = "default"
        }
    }

    class sX extends n7 {
        get map() {
            return this.material.map
        }

        set map(e) {
            this.material.map = e, this.material.needsUpdate = !0
        }

        constructor() {
            super(), sH(this, "cape", void 0), sH(this, "material", void 0), this.material = new sE({
                side: 2,
                transparent: !0,
                alphaTest: 1e-5
            });
            let e = new tO(10, 16, 1);
            sW(e, 0, 0, 10, 16, 1), this.cape = new tI(e, this.material), this.cape.position.y = -8, this.cape.position.z = .5, this.add(this.cape)
        }
    }

    class sY extends n7 {
        resetJoints() {
            this.leftWing.rotation.y = .01, this.leftWing.rotation.z = .2617994, this.updateRightWing()
        }

        updateRightWing() {
            this.rightWing.position.x = -this.leftWing.position.x, this.rightWing.position.y = this.leftWing.position.y, this.rightWing.rotation.x = this.leftWing.rotation.x, this.rightWing.rotation.y = -this.leftWing.rotation.y, this.rightWing.rotation.z = -this.leftWing.rotation.z
        }

        get map() {
            return this.material.map
        }

        set map(e) {
            this.material.map = e, this.material.needsUpdate = !0
        }

        constructor() {
            super(), sH(this, "leftWing", void 0), sH(this, "rightWing", void 0), sH(this, "material", void 0), this.material = new sE({
                side: 2,
                transparent: !0,
                alphaTest: 1e-5
            });
            let e = new tO(12, 22, 4);
            sW(e, 22, 0, 10, 20, 2);
            let t = new tI(e, this.material);
            t.position.x = -5, t.position.y = -10, t.position.z = -1, this.leftWing = new n7, this.leftWing.add(t), this.add(this.leftWing);
            let i = new tO(12, 22, 4);
            sW(i, 22, 0, 10, 20, 2);
            let r = new tI(i, this.material);
            r.scale.x = -1, r.position.x = 5, r.position.y = -10, r.position.z = -1, this.rightWing = new n7, this.rightWing.add(r), this.add(this.rightWing), this.leftWing.position.x = 5, this.leftWing.rotation.x = .2617994, this.resetJoints()
        }
    }

    class sZ extends n7 {
        get map() {
            return this.material.map
        }

        set map(e) {
            this.material.map = e, this.material.needsUpdate = !0
        }

        constructor() {
            super(), sH(this, "rightEar", void 0), sH(this, "leftEar", void 0), sH(this, "material", void 0), this.material = new sE({side: 0});
            let e = new tO(8, 8, 4 / 3);
            sV(e, 0, 0, 6, 6, 1, 14, 7), this.rightEar = new tI(e, this.material), this.rightEar.name = "rightEar", this.rightEar.position.x = -6, this.add(this.rightEar), this.leftEar = new tI(e, this.material), this.leftEar.name = "leftEar", this.leftEar.position.x = 6, this.add(this.leftEar)
        }
    }

    let sK = 10.8 * Math.PI / 180;

    class sJ extends n7 {
        get backEquipment() {
            return this.cape.visible ? "cape" : this.elytra.visible ? "elytra" : null
        }

        set backEquipment(e) {
            this.cape.visible = "cape" === e, this.elytra.visible = "elytra" === e
        }

        resetJoints() {
            this.skin.resetJoints(), this.cape.rotation.x = sK, this.elytra.resetJoints()
        }

        constructor() {
            super(), sH(this, "skin", void 0), sH(this, "cape", void 0), sH(this, "elytra", void 0), sH(this, "ears", void 0), this.skin = new sq, this.skin.name = "skin", this.skin.position.y = 8, this.add(this.skin), this.cape = new sX, this.cape.name = "cape", this.cape.position.y = 8, this.cape.position.z = -2, this.cape.rotation.x = sK, this.cape.rotation.y = Math.PI, this.add(this.cape), this.elytra = new sY, this.elytra.name = "elytra", this.elytra.position.y = 8, this.elytra.position.z = -2, this.elytra.visible = !1, this.add(this.elytra), this.ears = new sZ, this.ears.name = "ears", this.ears.position.y = 10, this.ears.position.z = 2 / 3, this.ears.visible = !1, this.skin.head.add(this.ears)
        }
    }

    function sQ(e) {
        return e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap || "undefined" != typeof OffscreenCanvas && e instanceof OffscreenCanvas
    }

    function s$(e, t, i, r, a) {
        let n = e.getImageData(t, i, r, a);
        for (let e = 0; e < r; e++) for (let t = 0; t < a; t++) {
            let i = (e + t * r) * 4;
            if (255 !== n.data[i + 3]) return !0
        }
        return !1
    }

    function s0(e, t, i) {
        if (i) {
            if (s$(e, 0, 0, t, t)) return
        } else if (s$(e, 0, 0, t, t / 2)) return;
        let r = t / 64, a = (t, i, a, n) => e.clearRect(t * r, i * r, a * r, n * r);
        a(40, 0, 8, 8), a(48, 0, 8, 8), a(32, 8, 8, 8), a(40, 8, 8, 8), a(48, 8, 8, 8), a(56, 8, 8, 8), i && (a(4, 32, 4, 4), a(8, 32, 4, 4), a(0, 36, 4, 12), a(4, 36, 4, 12), a(8, 36, 4, 12), a(12, 36, 4, 12), a(20, 32, 8, 4), a(28, 32, 8, 4), a(16, 36, 4, 12), a(20, 36, 8, 12), a(28, 36, 4, 12), a(32, 36, 8, 12), a(44, 32, 4, 4), a(48, 32, 4, 4), a(40, 36, 4, 12), a(44, 36, 4, 12), a(48, 36, 4, 12), a(52, 36, 12, 12), a(4, 48, 4, 4), a(8, 48, 4, 4), a(0, 52, 4, 12), a(4, 52, 4, 12), a(8, 52, 4, 12), a(12, 52, 4, 12), a(52, 48, 4, 4), a(56, 48, 4, 4), a(48, 52, 4, 12), a(52, 52, 4, 12), a(56, 52, 4, 12), a(60, 52, 4, 12))
    }

    function s1(e, t) {
        if (t.width !== t.height && t.width !== 2 * t.height) throw Error(`Bad skin size: ${t.width}x${t.height}`);
        let i = t.width / 64, r = 14 * i, a = 7 * i;
        e.width = r, e.height = a;
        let n = e.getContext("2d", {willReadFrequently: !0});
        n.clearRect(0, 0, r, a), n.drawImage(t, 24 * i, 0, r, a, 0, 0, r, a)
    }

    async function s3(e) {
        let t = document.createElement("img");
        return new Promise((i, r) => {
            t.onload = () => i(t), t.onerror = r, t.crossOrigin = "anonymous", "string" == typeof e ? t.src = e : (void 0 !== e.crossOrigin && (t.crossOrigin = e.crossOrigin), void 0 !== e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.src = e.src)
        })
    }

    let s2 = {type: "change"}, s4 = {type: "start"}, s5 = {type: "end"}, s6 = new ex, s8 = new tK,
        s7 = Math.cos(70 * u);

    class s9 extends h {
        constructor(e, t) {
            super(), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new W, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
                LEFT: "ArrowLeft",
                UP: "ArrowUp",
                RIGHT: "ArrowRight",
                BOTTOM: "ArrowDown"
            }, this.mouseButtons = {LEFT: r.ROTATE, MIDDLE: r.DOLLY, RIGHT: r.PAN}, this.touches = {
                ONE: a.ROTATE,
                TWO: a.DOLLY_PAN
            }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function () {
                return l.phi
            }, this.getAzimuthalAngle = function () {
                return l.theta
            }, this.getDistance = function () {
                return this.object.position.distanceTo(this.target)
            }, this.listenToKeyEvents = function (e) {
                e.addEventListener("keydown", J), this._domElementKeyEvents = e
            }, this.stopListenToKeyEvents = function () {
                this._domElementKeyEvents.removeEventListener("keydown", J), this._domElementKeyEvents = null
            }, this.saveState = function () {
                i.target0.copy(i.target), i.position0.copy(i.object.position), i.zoom0 = i.object.zoom
            }, this.reset = function () {
                i.target.copy(i.target0), i.object.position.copy(i.position0), i.object.zoom = i.zoom0, i.object.updateProjectionMatrix(), i.dispatchEvent(s2), i.update(), s = n.NONE
            }, this.update = function () {
                let t = new W, r = new G().setFromUnitVectors(e.up, new W(0, 1, 0)), a = r.clone().invert(), d = new W,
                    p = new G, f = new W, m = 2 * Math.PI;
                return function (g = null) {
                    let v = i.object.position;
                    t.copy(v).sub(i.target), t.applyQuaternion(r), l.setFromVector3(t), i.autoRotate && s === n.NONE && C(null !== g ? 2 * Math.PI / 60 * i.autoRotateSpeed * g : 2 * Math.PI / 60 / 60 * i.autoRotateSpeed), i.enableDamping ? (l.theta += h.theta * i.dampingFactor, l.phi += h.phi * i.dampingFactor) : (l.theta += h.theta, l.phi += h.phi);
                    let _ = i.minAzimuthAngle, x = i.maxAzimuthAngle;
                    isFinite(_) && isFinite(x) && (_ < -Math.PI ? _ += m : _ > Math.PI && (_ -= m), x < -Math.PI ? x += m : x > Math.PI && (x -= m), _ <= x ? l.theta = Math.max(_, Math.min(x, l.theta)) : l.theta = l.theta > (_ + x) / 2 ? Math.max(_, l.theta) : Math.min(x, l.theta)), l.phi = Math.max(i.minPolarAngle, Math.min(i.maxPolarAngle, l.phi)), l.makeSafe(), !0 === i.enableDamping ? i.target.addScaledVector(u, i.dampingFactor) : i.target.add(u), i.zoomToCursor && w || i.object.isOrthographicCamera ? l.radius = O(l.radius) : l.radius = O(l.radius * c), t.setFromSpherical(l), t.applyQuaternion(a), v.copy(i.target).add(t), i.object.lookAt(i.target), !0 === i.enableDamping ? (h.theta *= 1 - i.dampingFactor, h.phi *= 1 - i.dampingFactor, u.multiplyScalar(1 - i.dampingFactor)) : (h.set(0, 0, 0), u.set(0, 0, 0));
                    let y = !1;
                    if (i.zoomToCursor && w) {
                        let r = null;
                        if (i.object.isPerspectiveCamera) {
                            let e = t.length();
                            r = O(e * c);
                            let a = e - r;
                            i.object.position.addScaledVector(S, a), i.object.updateMatrixWorld()
                        } else if (i.object.isOrthographicCamera) {
                            let e = new W(b.x, b.y, 0);
                            e.unproject(i.object), i.object.zoom = Math.max(i.minZoom, Math.min(i.maxZoom, i.object.zoom / c)), i.object.updateProjectionMatrix(), y = !0;
                            let a = new W(b.x, b.y, 0);
                            a.unproject(i.object), i.object.position.sub(a).add(e), i.object.updateMatrixWorld(), r = t.length()
                        } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), i.zoomToCursor = !1;
                        null !== r && (this.screenSpacePanning ? i.target.set(0, 0, -1).transformDirection(i.object.matrix).multiplyScalar(r).add(i.object.position) : (s6.origin.copy(i.object.position), s6.direction.set(0, 0, -1).transformDirection(i.object.matrix), Math.abs(i.object.up.dot(s6.direction)) < s7 ? e.lookAt(i.target) : (s8.setFromNormalAndCoplanarPoint(i.object.up, i.target), s6.intersectPlane(s8, i.target))))
                    } else i.object.isOrthographicCamera && (i.object.zoom = Math.max(i.minZoom, Math.min(i.maxZoom, i.object.zoom / c)), i.object.updateProjectionMatrix(), y = !0);
                    return c = 1, w = !1, !!(y || d.distanceToSquared(i.object.position) > o || 8 * (1 - p.dot(i.object.quaternion)) > o || f.distanceToSquared(i.target) > 0) && (i.dispatchEvent(s2), d.copy(i.object.position), p.copy(i.object.quaternion), f.copy(i.target), y = !1, !0)
                }
            }(), this.dispose = function () {
                i.domElement.removeEventListener("contextmenu", Q), i.domElement.removeEventListener("pointerdown", X), i.domElement.removeEventListener("pointercancel", Z), i.domElement.removeEventListener("wheel", K), i.domElement.removeEventListener("pointermove", Y), i.domElement.removeEventListener("pointerup", Z), null !== i._domElementKeyEvents && (i._domElementKeyEvents.removeEventListener("keydown", J), i._domElementKeyEvents = null)
            };
            let i = this, n = {
                    NONE: -1,
                    ROTATE: 0,
                    DOLLY: 1,
                    PAN: 2,
                    TOUCH_ROTATE: 3,
                    TOUCH_PAN: 4,
                    TOUCH_DOLLY_PAN: 5,
                    TOUCH_DOLLY_ROTATE: 6
                }, s = n.NONE, o = 1e-6, l = new sk, h = new sk, c = 1, u = new W, d = new x, p = new x, f = new x,
                m = new x, g = new x, v = new x, _ = new x, y = new x, M = new x, S = new W, b = new x, w = !1, T = [],
                E = {};

            function A() {
                return Math.pow(.95, i.zoomSpeed)
            }

            function C(e) {
                h.theta -= e
            }

            function L(e) {
                h.phi -= e
            }

            let P = function () {
                let e = new W;
                return function (t, i) {
                    e.setFromMatrixColumn(i, 0), e.multiplyScalar(-t), u.add(e)
                }
            }(), R = function () {
                let e = new W;
                return function (t, r) {
                    !0 === i.screenSpacePanning ? e.setFromMatrixColumn(r, 1) : (e.setFromMatrixColumn(r, 0), e.crossVectors(i.object.up, e)), e.multiplyScalar(t), u.add(e)
                }
            }(), D = function () {
                let e = new W;
                return function (t, r) {
                    let a = i.domElement;
                    if (i.object.isPerspectiveCamera) {
                        let n = i.object.position;
                        e.copy(n).sub(i.target);
                        let s = e.length();
                        P(2 * t * (s *= Math.tan(i.object.fov / 2 * Math.PI / 180)) / a.clientHeight, i.object.matrix), R(2 * r * s / a.clientHeight, i.object.matrix)
                    } else i.object.isOrthographicCamera ? (P(t * (i.object.right - i.object.left) / i.object.zoom / a.clientWidth, i.object.matrix), R(r * (i.object.top - i.object.bottom) / i.object.zoom / a.clientHeight, i.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), i.enablePan = !1)
                }
            }();

            function U(e) {
                i.object.isPerspectiveCamera || i.object.isOrthographicCamera ? c /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), i.enableZoom = !1)
            }

            function I(e) {
                i.object.isPerspectiveCamera || i.object.isOrthographicCamera ? c *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), i.enableZoom = !1)
            }

            function N(e) {
                if (!i.zoomToCursor) return;
                w = !0;
                let t = i.domElement.getBoundingClientRect(), r = e.clientX - t.left, a = e.clientY - t.top,
                    n = t.width, s = t.height;
                b.x = r / n * 2 - 1, b.y = -(2 * (a / s)) + 1, S.set(b.x, b.y, 1).unproject(i.object).sub(i.object.position).normalize()
            }

            function O(e) {
                return Math.max(i.minDistance, Math.min(i.maxDistance, e))
            }

            function z(e) {
                d.set(e.clientX, e.clientY)
            }

            function F(e) {
                m.set(e.clientX, e.clientY)
            }

            function B() {
                if (1 === T.length) d.set(T[0].pageX, T[0].pageY); else {
                    let e = .5 * (T[0].pageX + T[1].pageX), t = .5 * (T[0].pageY + T[1].pageY);
                    d.set(e, t)
                }
            }

            function k() {
                if (1 === T.length) m.set(T[0].pageX, T[0].pageY); else {
                    let e = .5 * (T[0].pageX + T[1].pageX), t = .5 * (T[0].pageY + T[1].pageY);
                    m.set(e, t)
                }
            }

            function H() {
                let e = T[0].pageX - T[1].pageX, t = T[0].pageY - T[1].pageY;
                _.set(0, Math.sqrt(e * e + t * t))
            }

            function V(e) {
                if (1 == T.length) p.set(e.pageX, e.pageY); else {
                    let t = ee(e), i = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
                    p.set(i, r)
                }
                f.subVectors(p, d).multiplyScalar(i.rotateSpeed);
                let t = i.domElement;
                C(2 * Math.PI * f.x / t.clientHeight), L(2 * Math.PI * f.y / t.clientHeight), d.copy(p)
            }

            function j(e) {
                if (1 === T.length) g.set(e.pageX, e.pageY); else {
                    let t = ee(e), i = .5 * (e.pageX + t.x), r = .5 * (e.pageY + t.y);
                    g.set(i, r)
                }
                v.subVectors(g, m).multiplyScalar(i.panSpeed), D(v.x, v.y), m.copy(g)
            }

            function q(e) {
                let t = ee(e), r = e.pageX - t.x, a = e.pageY - t.y;
                y.set(0, Math.sqrt(r * r + a * a)), M.set(0, Math.pow(y.y / _.y, i.zoomSpeed)), U(M.y), _.copy(y)
            }

            function X(e) {
                !1 !== i.enabled && (0 === T.length && (i.domElement.setPointerCapture(e.pointerId), i.domElement.addEventListener("pointermove", Y), i.domElement.addEventListener("pointerup", Z)), T.push(e), "touch" === e.pointerType ? function (e) {
                    switch ($(e), T.length) {
                        case 1:
                            switch (i.touches.ONE) {
                                case a.ROTATE:
                                    if (!1 === i.enableRotate) return;
                                    B(), s = n.TOUCH_ROTATE;
                                    break;
                                case a.PAN:
                                    if (!1 === i.enablePan) return;
                                    k(), s = n.TOUCH_PAN;
                                    break;
                                default:
                                    s = n.NONE
                            }
                            break;
                        case 2:
                            switch (i.touches.TWO) {
                                case a.DOLLY_PAN:
                                    if (!1 === i.enableZoom && !1 === i.enablePan) return;
                                    i.enableZoom && H(), i.enablePan && k(), s = n.TOUCH_DOLLY_PAN;
                                    break;
                                case a.DOLLY_ROTATE:
                                    if (!1 === i.enableZoom && !1 === i.enableRotate) return;
                                    i.enableZoom && H(), i.enableRotate && B(), s = n.TOUCH_DOLLY_ROTATE;
                                    break;
                                default:
                                    s = n.NONE
                            }
                            break;
                        default:
                            s = n.NONE
                    }
                    s !== n.NONE && i.dispatchEvent(s4)
                }(e) : function (e) {
                    let t;
                    switch (e.button) {
                        case 0:
                            t = i.mouseButtons.LEFT;
                            break;
                        case 1:
                            t = i.mouseButtons.MIDDLE;
                            break;
                        case 2:
                            t = i.mouseButtons.RIGHT;
                            break;
                        default:
                            t = -1
                    }
                    switch (t) {
                        case r.DOLLY:
                            if (!1 === i.enableZoom) return;
                            N(e), _.set(e.clientX, e.clientY), s = n.DOLLY;
                            break;
                        case r.ROTATE:
                            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                if (!1 === i.enablePan) return;
                                F(e), s = n.PAN
                            } else {
                                if (!1 === i.enableRotate) return;
                                z(e), s = n.ROTATE
                            }
                            break;
                        case r.PAN:
                            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                if (!1 === i.enableRotate) return;
                                z(e), s = n.ROTATE
                            } else {
                                if (!1 === i.enablePan) return;
                                F(e), s = n.PAN
                            }
                            break;
                        default:
                            s = n.NONE
                    }
                    s !== n.NONE && i.dispatchEvent(s4)
                }(e))
            }

            function Y(e) {
                !1 !== i.enabled && ("touch" === e.pointerType ? function (e) {
                    switch ($(e), s) {
                        case n.TOUCH_ROTATE:
                            if (!1 === i.enableRotate) return;
                            V(e), i.update();
                            break;
                        case n.TOUCH_PAN:
                            if (!1 === i.enablePan) return;
                            j(e), i.update();
                            break;
                        case n.TOUCH_DOLLY_PAN:
                            if (!1 === i.enableZoom && !1 === i.enablePan) return;
                            i.enableZoom && q(e), i.enablePan && j(e), i.update();
                            break;
                        case n.TOUCH_DOLLY_ROTATE:
                            if (!1 === i.enableZoom && !1 === i.enableRotate) return;
                            i.enableZoom && q(e), i.enableRotate && V(e), i.update();
                            break;
                        default:
                            s = n.NONE
                    }
                }(e) : function (e) {
                    switch (s) {
                        case n.ROTATE:
                            if (!1 === i.enableRotate) return;
                            !function (e) {
                                p.set(e.clientX, e.clientY), f.subVectors(p, d).multiplyScalar(i.rotateSpeed);
                                let t = i.domElement;
                                C(2 * Math.PI * f.x / t.clientHeight), L(2 * Math.PI * f.y / t.clientHeight), d.copy(p), i.update()
                            }(e);
                            break;
                        case n.DOLLY:
                            if (!1 === i.enableZoom) return;
                            y.set(e.clientX, e.clientY), M.subVectors(y, _), M.y > 0 ? U(A()) : M.y < 0 && I(A()), _.copy(y), i.update();
                            break;
                        case n.PAN:
                            if (!1 === i.enablePan) return;
                            g.set(e.clientX, e.clientY), v.subVectors(g, m).multiplyScalar(i.panSpeed), D(v.x, v.y), m.copy(g), i.update()
                    }
                }(e))
            }

            function Z(e) {
                (function (e) {
                    delete E[e.pointerId];
                    for (let t = 0; t < T.length; t++) if (T[t].pointerId == e.pointerId) {
                        T.splice(t, 1);
                        return
                    }
                })(e), 0 === T.length && (i.domElement.releasePointerCapture(e.pointerId), i.domElement.removeEventListener("pointermove", Y), i.domElement.removeEventListener("pointerup", Z)), i.dispatchEvent(s5), s = n.NONE
            }

            function K(e) {
                !1 !== i.enabled && !1 !== i.enableZoom && s === n.NONE && (e.preventDefault(), i.dispatchEvent(s4), N(e), e.deltaY < 0 ? I(A()) : e.deltaY > 0 && U(A()), i.update(), i.dispatchEvent(s5))
            }

            function J(e) {
                !1 !== i.enabled && !1 !== i.enablePan && function (e) {
                    let t = !1;
                    switch (e.code) {
                        case i.keys.UP:
                            e.ctrlKey || e.metaKey || e.shiftKey ? L(2 * Math.PI * i.rotateSpeed / i.domElement.clientHeight) : D(0, i.keyPanSpeed), t = !0;
                            break;
                        case i.keys.BOTTOM:
                            e.ctrlKey || e.metaKey || e.shiftKey ? L(-2 * Math.PI * i.rotateSpeed / i.domElement.clientHeight) : D(0, -i.keyPanSpeed), t = !0;
                            break;
                        case i.keys.LEFT:
                            e.ctrlKey || e.metaKey || e.shiftKey ? C(2 * Math.PI * i.rotateSpeed / i.domElement.clientHeight) : D(i.keyPanSpeed, 0), t = !0;
                            break;
                        case i.keys.RIGHT:
                            e.ctrlKey || e.metaKey || e.shiftKey ? C(-2 * Math.PI * i.rotateSpeed / i.domElement.clientHeight) : D(-i.keyPanSpeed, 0), t = !0
                    }
                    t && (e.preventDefault(), i.update())
                }(e)
            }

            function Q(e) {
                !1 !== i.enabled && e.preventDefault()
            }

            function $(e) {
                let t = E[e.pointerId];
                void 0 === t && (t = new x, E[e.pointerId] = t), t.set(e.pageX, e.pageY)
            }

            function ee(e) {
                let t = e.pointerId === T[0].pointerId ? T[1] : T[0];
                return E[t.pointerId]
            }

            i.domElement.addEventListener("contextmenu", Q), i.domElement.addEventListener("pointerdown", X), i.domElement.addEventListener("pointercancel", Z), i.domElement.addEventListener("wheel", K, {passive: !1}), this.update()
        }
    }

    let oe = {
        name: "CopyShader",
        uniforms: {tDiffuse: {value: null}, opacity: {value: 1}},
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: "uniform float opacity;uniform sampler2D tDiffuse;varying vec2 vUv;void main(){vec4 texel=texture2D(tDiffuse,vUv);gl_FragColor=opacity*texel;}"
    };

    class ot {
        constructor() {
            this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1
        }

        setSize() {
        }

        render() {
            console.error("THREE.Pass: .render() must be implemented in derived pass.")
        }

        dispose() {
        }
    }

    let oi = new al(-1, 1, 1, -1, 0, 1), or = new tg;
    or.setAttribute("position", new tl([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), or.setAttribute("uv", new tl([0, 2, 0, 0, 2, 0], 2));

    class oa {
        constructor(e) {
            this._mesh = new tI(or, e)
        }

        dispose() {
            this._mesh.geometry.dispose()
        }

        render(e) {
            e.render(this._mesh, oi)
        }

        get material() {
            return this._mesh.material
        }

        set material(e) {
            this._mesh.material = e
        }
    }

    class on extends ot {
        constructor(e, t) {
            super(), this.textureID = void 0 !== t ? t : "tDiffuse", e instanceof tH ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = tk.clone(e.uniforms), this.material = new tH({
                name: void 0 !== e.name ? e.name : "unspecified",
                defines: Object.assign({}, e.defines),
                uniforms: this.uniforms,
                vertexShader: e.vertexShader,
                fragmentShader: e.fragmentShader
            })), this.fsQuad = new oa(this.material)
        }

        render(e, t, i) {
            this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e))
        }

        dispose() {
            this.material.dispose(), this.fsQuad.dispose()
        }
    }

    class os extends ot {
        constructor(e, t) {
            super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1
        }

        render(e, t, i) {
            let r, a;
            let n = e.getContext(), s = e.state;
            s.buffers.color.setMask(!1), s.buffers.depth.setMask(!1), s.buffers.color.setLocked(!0), s.buffers.depth.setLocked(!0), this.inverse ? (r = 0, a = 1) : (r = 1, a = 0), s.buffers.stencil.setTest(!0), s.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE), s.buffers.stencil.setFunc(n.ALWAYS, r, 4294967295), s.buffers.stencil.setClear(a), s.buffers.stencil.setLocked(!0), e.setRenderTarget(i), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), s.buffers.color.setLocked(!1), s.buffers.depth.setLocked(!1), s.buffers.color.setMask(!0), s.buffers.depth.setMask(!0), s.buffers.stencil.setLocked(!1), s.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295), s.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP), s.buffers.stencil.setLocked(!0)
        }
    }

    class oo extends ot {
        constructor() {
            super(), this.needsSwap = !1
        }

        render(e) {
            e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1)
        }
    }

    class ol {
        constructor(e, t) {
            if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), void 0 === t) {
                let i = e.getSize(new x);
                this._width = i.width, this._height = i.height, (t = new H(this._width * this._pixelRatio, this._height * this._pixelRatio, {type: 1016})).texture.name = "EffectComposer.rt1"
            } else this._width = t.width, this._height = t.height;
            this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new on(oe), this.copyPass.material.blending = 0, this.clock = new sF
        }

        swapBuffers() {
            let e = this.readBuffer;
            this.readBuffer = this.writeBuffer, this.writeBuffer = e
        }

        addPass(e) {
            this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }

        insertPass(e, t) {
            this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }

        removePass(e) {
            let t = this.passes.indexOf(e);
            -1 !== t && this.passes.splice(t, 1)
        }

        isLastEnabledPass(e) {
            for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
            return !0
        }

        render(e) {
            void 0 === e && (e = this.clock.getDelta());
            let t = this.renderer.getRenderTarget(), i = !1;
            for (let t = 0, r = this.passes.length; t < r; t++) {
                let r = this.passes[t];
                if (!1 !== r.enabled) {
                    if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), r.needsSwap) {
                        if (i) {
                            let t = this.renderer.getContext(), i = this.renderer.state.buffers.stencil;
                            i.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), i.setFunc(t.EQUAL, 1, 4294967295)
                        }
                        this.swapBuffers()
                    }
                    void 0 !== os && (r instanceof os ? i = !0 : r instanceof oo && (i = !1))
                }
            }
            this.renderer.setRenderTarget(t)
        }

        reset(e) {
            if (void 0 === e) {
                let t = this.renderer.getSize(new x);
                this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, (e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
            }
            this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2
        }

        setSize(e, t) {
            this._width = e, this._height = t;
            let i = this._width * this._pixelRatio, r = this._height * this._pixelRatio;
            this.renderTarget1.setSize(i, r), this.renderTarget2.setSize(i, r);
            for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(i, r)
        }

        setPixelRatio(e) {
            this._pixelRatio = e, this.setSize(this._width, this._height)
        }

        dispose() {
            this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose()
        }
    }

    class oh extends ot {
        constructor(e, t, i = null, r = null, a = null) {
            super(), this.scene = e, this.camera = t, this.overrideMaterial = i, this.clearColor = r, this.clearAlpha = a, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new te
        }

        render(e, t, i) {
            let r, a;
            let n = e.autoClear;
            e.autoClear = !1, null !== this.overrideMaterial && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), null !== this.clearColor && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor)), null !== this.clearAlpha && (r = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), !0 == this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : i), !0 === this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), null !== this.clearColor && e.setClearColor(this._oldClearColor), null !== this.clearAlpha && e.setClearAlpha(r), null !== this.overrideMaterial && (this.scene.overrideMaterial = a), e.autoClear = n
        }
    }

    let oc = {
        uniforms: {tDiffuse: {value: null}, resolution: {value: new x(1 / 1024, 1 / 512)}},
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: `precision highp float;uniform sampler2D tDiffuse;uniform vec2 resolution;varying vec2 vUv;
#ifndef FXAA_DISCARD
#define FXAA_DISCARD 0
#endif
#define FxaaTexTop(t,p)texture2D(t,p,-100.0)
#define FxaaTexOff(t,p,o,r)texture2D(t,p+(o*r),-100.0)
#define NUM_SAMPLES 5
float contrast(vec4 a,vec4 b){vec4 diff=abs(a-b);return max(max(max(diff.r,diff.g),diff.b),diff.a);}vec4 FxaaPixelShader(vec2 posM,sampler2D tex,vec2 fxaaQualityRcpFrame,float fxaaQualityEdgeThreshold,float fxaaQualityinvEdgeThreshold){vec4 rgbaM=FxaaTexTop(tex,posM);vec4 rgbaS=FxaaTexOff(tex,posM,vec2(0.0,1.0),fxaaQualityRcpFrame.xy);vec4 rgbaE=FxaaTexOff(tex,posM,vec2(1.0,0.0),fxaaQualityRcpFrame.xy);vec4 rgbaN=FxaaTexOff(tex,posM,vec2(0.0,-1.0),fxaaQualityRcpFrame.xy);vec4 rgbaW=FxaaTexOff(tex,posM,vec2(-1.0,0.0),fxaaQualityRcpFrame.xy);bool earlyExit=max(max(max(contrast(rgbaM,rgbaN),contrast(rgbaM,rgbaS)),contrast(rgbaM,rgbaE)),contrast(rgbaM,rgbaW))<fxaaQualityEdgeThreshold;
#if (FXAA_DISCARD==1)
if(earlyExit)FxaaDiscard;
#else
if(earlyExit)return rgbaM;
#endif
float contrastN=contrast(rgbaM,rgbaN);float contrastS=contrast(rgbaM,rgbaS);float contrastE=contrast(rgbaM,rgbaE);float contrastW=contrast(rgbaM,rgbaW);float relativeVContrast=(contrastN+contrastS)-(contrastE+contrastW);relativeVContrast*=fxaaQualityinvEdgeThreshold;bool horzSpan=relativeVContrast>0.;if(abs(relativeVContrast)<.3){vec2 dirToEdge;dirToEdge.x=contrastE>contrastW?1.:-1.;dirToEdge.y=contrastS>contrastN?1.:-1.;vec4 rgbaAlongH=FxaaTexOff(tex,posM,vec2(dirToEdge.x,-dirToEdge.y),fxaaQualityRcpFrame.xy);float matchAlongH=contrast(rgbaM,rgbaAlongH);vec4 rgbaAlongV=FxaaTexOff(tex,posM,vec2(-dirToEdge.x,dirToEdge.y),fxaaQualityRcpFrame.xy);float matchAlongV=contrast(rgbaM,rgbaAlongV);relativeVContrast=matchAlongV-matchAlongH;relativeVContrast*=fxaaQualityinvEdgeThreshold;if(abs(relativeVContrast)<.3){return mix(rgbaM,(rgbaN+rgbaS+rgbaE+rgbaW)*.25,.4);}horzSpan=relativeVContrast>0.;}if(!horzSpan)rgbaN=rgbaW;if(!horzSpan)rgbaS=rgbaE;bool pairN=contrast(rgbaM,rgbaN)>contrast(rgbaM,rgbaS);if(!pairN)rgbaN=rgbaS;vec2 offNP;offNP.x=(!horzSpan)?0.0:fxaaQualityRcpFrame.x;offNP.y=(horzSpan)?0.0:fxaaQualityRcpFrame.y;bool doneN=false;bool doneP=false;float nDist=0.;float pDist=0.;vec2 posN=posM;vec2 posP=posM;int iterationsUsed=0;int iterationsUsedN=0;int iterationsUsedP=0;for(int i=0;i<NUM_SAMPLES;i++){iterationsUsed=i;float increment=float(i+1);if(!doneN){nDist+=increment;posN=posM+offNP*nDist;vec4 rgbaEndN=FxaaTexTop(tex,posN.xy);doneN=contrast(rgbaEndN,rgbaM)>contrast(rgbaEndN,rgbaN);iterationsUsedN=i;}if(!doneP){pDist+=increment;posP=posM-offNP*pDist;vec4 rgbaEndP=FxaaTexTop(tex,posP.xy);doneP=contrast(rgbaEndP,rgbaM)>contrast(rgbaEndP,rgbaN);iterationsUsedP=i;}if(doneN||doneP)break;}if(!doneP&&!doneN)return rgbaM;float dist=min(doneN?float(iterationsUsedN)/float(NUM_SAMPLES-1):1.,doneP?float(iterationsUsedP)/float(NUM_SAMPLES-1):1.);dist=pow(dist,.5);dist=1.-dist;return mix(rgbaM,rgbaN,dist*.5);}void main(){const float edgeDetectionQuality=.2;const float invEdgeDetectionQuality=1./edgeDetectionQuality;gl_FragColor=FxaaPixelShader(vUv,tDiffuse,resolution,edgeDetectionQuality,invEdgeDetectionQuality);}`
    };

    function ou(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    class od extends sb {
        async loadAndPaint() {
            await document.fonts.load(this.font, this.text), this.paint()
        }

        paint() {
            let e = document.createElement("canvas"), t = e.getContext("2d");
            t.font = this.font;
            let i = t.measureText(this.text);
            e.width = this.margin[3] + i.actualBoundingBoxLeft + i.actualBoundingBoxRight + this.margin[1], e.height = this.margin[0] + i.actualBoundingBoxAscent + i.actualBoundingBoxDescent + this.margin[2], (t = e.getContext("2d")).font = this.font, t.fillStyle = this.backgroundStyle, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.textStyle, t.fillText(this.text, this.margin[3] + i.actualBoundingBoxLeft, this.margin[0] + i.actualBoundingBoxAscent);
            let r = new sT(e);
            r.magFilter = 1003, r.minFilter = 1003, this.textMaterial.map = r, this.textMaterial.needsUpdate = !0, this.scale.x = e.width / e.height * this.height, this.scale.y = this.height
        }

        constructor(e = "", t = {}) {
            let i = new sc({transparent: !0, alphaTest: 1e-5});
            super(i), ou(this, "painted", void 0), ou(this, "text", void 0), ou(this, "font", void 0), ou(this, "margin", void 0), ou(this, "textStyle", void 0), ou(this, "backgroundStyle", void 0), ou(this, "height", void 0), ou(this, "textMaterial", void 0), this.textMaterial = i, this.text = e, this.font = void 0 === t.font ? "48px Minecraft" : t.font, this.margin = void 0 === t.margin ? [5, 10, 5, 10] : t.margin, this.textStyle = void 0 === t.textStyle ? "white" : t.textStyle, this.backgroundStyle = void 0 === t.backgroundStyle ? "rgba(0,0,0,.25)" : t.backgroundStyle, this.height = void 0 === t.height ? 4 : t.height;
            let r = void 0 === t.repaintAfterLoaded || t.repaintAfterLoaded;
            r && !document.fonts.check(this.font, this.text) ? (this.paint(), this.painted = this.loadAndPaint()) : (this.paint(), this.painted = Promise.resolve())
        }
    }

    function op(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function of(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    class om {
        update(e, t) {
            if (this.paused) return;
            let i = t * this.speed;
            this.animate(e, i), this.progress += i
        }

        constructor() {
            of(this, "speed", 1), of(this, "paused", !1), of(this, "progress", 0)
        }
    }

    e.BodyPart = sj, e.CapeObject = sX, e.EarsObject = sZ, e.ElytraObject = sY, e.FlyingAnimation = class extends om {
        animate(e) {
            var t;
            let i = this.progress > 0 ? 20 * this.progress : 0, r = (t = i * i / 100) <= 0 ? 0 : t >= 1 ? 1 : t;
            e.rotation.x = r * Math.PI / 2, e.skin.head.rotation.x = r > .5 ? Math.PI / 4 - e.rotation.x : 0;
            let a = .25 * Math.PI * r;
            e.skin.leftArm.rotation.z = a, e.skin.rightArm.rotation.z = -a;
            let n = Math.PI / 2, s = Math.pow(.9, i);
            e.elytra.leftWing.rotation.x = .34906584 + -.08726644 * s, e.elytra.leftWing.rotation.z = n + s * (.2617994 - n), e.elytra.updateRightWing()
        }
    }, e.FunctionAnimation = class extends om {
        animate(e, t) {
            this.fn(e, this.progress, t)
        }

        constructor(e) {
            super(), of(this, "fn", void 0), this.fn = e
        }
    }, e.IdleAnimation = class extends om {
        animate(e) {
            let t = 2 * this.progress, i = .02 * Math.PI;
            e.skin.leftArm.rotation.z = .03 * Math.cos(t) + i, e.skin.rightArm.rotation.z = .03 * Math.cos(t + Math.PI) - i, e.cape.rotation.x = .01 * Math.sin(t) + .06 * Math.PI
        }
    }, e.NameTagObject = od, e.PlayerAnimation = om, e.PlayerObject = sJ, e.RunningAnimation = class extends om {
        animate(e) {
            let t = 15 * this.progress + .5 * Math.PI;
            e.skin.leftLeg.rotation.x = 1.3 * Math.cos(t + Math.PI), e.skin.rightLeg.rotation.x = 1.3 * Math.cos(t), e.skin.leftArm.rotation.x = 1.5 * Math.cos(t), e.skin.rightArm.rotation.x = 1.5 * Math.cos(t + Math.PI);
            let i = .1 * Math.PI;
            e.skin.leftArm.rotation.z = .1 * Math.cos(t) + i, e.skin.rightArm.rotation.z = .1 * Math.cos(t + Math.PI) - i, e.position.y = Math.cos(2 * t), e.position.x = .15 * Math.cos(t), e.rotation.z = .01 * Math.cos(t + Math.PI), e.cape.rotation.x = .1 * Math.sin(2 * t) + .3 * Math.PI
        }
    }, e.SkinObject = sq, e.SkinViewer = class {
        updateComposerSize() {
            this.composer.setSize(this.width, this.height);
            let e = this.renderer.getPixelRatio();
            this.composer.setPixelRatio(e), this.fxaaPass.material.uniforms.resolution.value.x = 1 / (this.width * e), this.fxaaPass.material.uniforms.resolution.value.y = 1 / (this.height * e)
        }

        recreateSkinTexture() {
            null !== this.skinTexture && this.skinTexture.dispose(), this.skinTexture = new sT(this.skinCanvas), this.skinTexture.magFilter = 1003, this.skinTexture.minFilter = 1003, this.playerObject.skin.map = this.skinTexture
        }

        recreateCapeTexture() {
            null !== this.capeTexture && this.capeTexture.dispose(), this.capeTexture = new sT(this.capeCanvas), this.capeTexture.magFilter = 1003, this.capeTexture.minFilter = 1003, this.playerObject.cape.map = this.capeTexture, this.playerObject.elytra.map = this.capeTexture
        }

        recreateEarsTexture() {
            null !== this.earsTexture && this.earsTexture.dispose(), this.earsTexture = new sT(this.earsCanvas), this.earsTexture.magFilter = 1003, this.earsTexture.minFilter = 1003, this.playerObject.ears.map = this.earsTexture
        }

        loadSkin(e, t = {}) {
            if (null === e) this.resetSkin(); else {
                if (!sQ(e)) return s3(e).then(e => this.loadSkin(e, t));
                (function (e, t) {
                    let i = !1;
                    if (t.width !== t.height) {
                        if (t.width === 2 * t.height) i = !0; else throw Error(`Bad skin size: ${t.width}x${t.height}`)
                    }
                    let r = e.getContext("2d", {willReadFrequently: !0});
                    if (i) {
                        let i = t.width;
                        e.width = i, e.height = i, r.clearRect(0, 0, i, i), r.drawImage(t, 0, 0, i, i / 2), function (e, t) {
                            e.save(), e.scale(-1, 1);
                            let i = t / 64,
                                r = (t, r, a, n, s, o) => e.drawImage(e.canvas, t * i, r * i, a * i, n * i, -s * i, o * i, -a * i, n * i);
                            r(4, 16, 4, 4, 20, 48), r(8, 16, 4, 4, 24, 48), r(0, 20, 4, 12, 24, 52), r(4, 20, 4, 12, 20, 52), r(8, 20, 4, 12, 16, 52), r(12, 20, 4, 12, 28, 52), r(44, 16, 4, 4, 36, 48), r(48, 16, 4, 4, 40, 48), r(40, 20, 4, 12, 40, 52), r(44, 20, 4, 12, 36, 52), r(48, 20, 4, 12, 32, 52), r(52, 20, 4, 12, 44, 52), e.restore()
                        }(r, i), s0(r, e.width, !1)
                    } else e.width = t.width, e.height = t.height, r.clearRect(0, 0, t.width, t.height), r.drawImage(t, 0, 0, e.width, e.height), s0(r, e.width, !0)
                })(this.skinCanvas, e), this.recreateSkinTexture(), void 0 === t.model || "auto-detect" === t.model ? this.playerObject.skin.modelType = function (e) {
                    let t = e.width / 64, i = e.getContext("2d", {willReadFrequently: !0}),
                        r = (e, r, a, n) => s$(i, e * t, r * t, a * t, n * t),
                        a = (e, r, a, n) => (function (e, t, i, r, a) {
                            let n = e.getImageData(t, i, r, a);
                            for (let e = 0; e < r; e++) for (let t = 0; t < a; t++) {
                                let i = (e + t * r) * 4;
                                if (!(0 === n.data[i + 0] && 0 === n.data[i + 1] && 0 === n.data[i + 2] && 255 === n.data[i + 3])) return !1
                            }
                            return !0
                        })(i, e * t, r * t, a * t, n * t), n = (e, r, a, n) => (function (e, t, i, r, a) {
                            let n = e.getImageData(t, i, r, a);
                            for (let e = 0; e < r; e++) for (let t = 0; t < a; t++) {
                                let i = (e + t * r) * 4;
                                if (!(255 === n.data[i + 0] && 255 === n.data[i + 1] && 255 === n.data[i + 2] && 255 === n.data[i + 3])) return !1
                            }
                            return !0
                        })(i, e * t, r * t, a * t, n * t),
                        s = r(50, 16, 2, 4) || r(54, 20, 2, 12) || r(42, 48, 2, 4) || r(46, 52, 2, 12) || a(50, 16, 2, 4) && a(54, 20, 2, 12) && a(42, 48, 2, 4) && a(46, 52, 2, 12) || n(50, 16, 2, 4) && n(54, 20, 2, 12) && n(42, 48, 2, 4) && n(46, 52, 2, 12);
                    return s ? "slim" : "default"
                }(this.skinCanvas) : this.playerObject.skin.modelType = t.model, !1 !== t.makeVisible && (this.playerObject.skin.visible = !0), (!0 === t.ears || "load-only" == t.ears) && (s1(this.earsCanvas, e), this.recreateEarsTexture(), !0 === t.ears && (this.playerObject.ears.visible = !0))
            }
        }

        resetSkin() {
            this.playerObject.skin.visible = !1, this.playerObject.skin.map = null, null !== this.skinTexture && (this.skinTexture.dispose(), this.skinTexture = null)
        }

        loadCape(e, t = {}) {
            if (null === e) this.resetCape(); else {
                if (!sQ(e)) return s3(e).then(e => this.loadCape(e, t));
                (function (e, t) {
                    let i = function (e) {
                        if (e.width === 2 * e.height) return e.width / 64;
                        if (17 * e.width == 22 * e.height) return e.width / 22;
                        if (11 * e.width == 23 * e.height) return e.width / 46;
                        throw Error(`Bad cape size: ${e.width}x${e.height}`)
                    }(t);
                    e.width = 64 * i, e.height = 32 * i;
                    let r = e.getContext("2d", {willReadFrequently: !0});
                    r.clearRect(0, 0, e.width, e.height), r.drawImage(t, 0, 0, t.width, t.height)
                })(this.capeCanvas, e), this.recreateCapeTexture(), !1 !== t.makeVisible && (this.playerObject.backEquipment = void 0 === t.backEquipment ? "cape" : t.backEquipment)
            }
        }

        resetCape() {
            this.playerObject.backEquipment = null, this.playerObject.cape.map = null, this.playerObject.elytra.map = null, null !== this.capeTexture && (this.capeTexture.dispose(), this.capeTexture = null)
        }

        loadEars(e, t = {}) {
            if (null === e) this.resetEars(); else {
                if (!sQ(e)) return s3(e).then(e => this.loadEars(e, t));
                "skin" === t.textureType ? s1(this.earsCanvas, e) : function (e, t) {
                    let i = function (e) {
                        if (e.width === 2 * e.height && e.height % 7 == 0) return e.height / 7;
                        throw Error(`Bad ears size: ${e.width}x${e.height}`)
                    }(t);
                    e.width = 14 * i, e.height = 7 * i;
                    let r = e.getContext("2d", {willReadFrequently: !0});
                    r.clearRect(0, 0, e.width, e.height), r.drawImage(t, 0, 0, t.width, t.height)
                }(this.earsCanvas, e), this.recreateEarsTexture(), !1 !== t.makeVisible && (this.playerObject.ears.visible = !0)
            }
        }

        resetEars() {
            this.playerObject.ears.visible = !1, this.playerObject.ears.map = null, null !== this.earsTexture && (this.earsTexture.dispose(), this.earsTexture = null)
        }

        loadPanorama(e) {
            return this.loadBackground(e, 303)
        }

        loadBackground(e, t) {
            if (!sQ(e)) return s3(e).then(e => this.loadBackground(e, t));
            null !== this.backgroundTexture && this.backgroundTexture.dispose(), this.backgroundTexture = new F, this.backgroundTexture.image = e, void 0 !== t && (this.backgroundTexture.mapping = t), this.backgroundTexture.needsUpdate = !0, this.scene.background = this.backgroundTexture
        }

        draw() {
            let e = this.clock.getDelta();
            null !== this._animation && this._animation.update(this.playerObject, e), this.autoRotate && (this.playerWrapper.rotation.y += e * this.autoRotateSpeed), this.controls.update(), this.render(), this.animationID = window.requestAnimationFrame(() => this.draw())
        }

        render() {
            this.composer.render()
        }

        setSize(e, t) {
            this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.updateComposerSize()
        }

        dispose() {
            this._disposed = !0, this.canvas.removeEventListener("webglcontextlost", this.onContextLost, !1), this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored, !1), null !== this.devicePixelRatioQuery && (this.devicePixelRatioQuery.removeEventListener("change", this.onDevicePixelRatioChange), this.devicePixelRatioQuery = null), null !== this.animationID && (window.cancelAnimationFrame(this.animationID), this.animationID = null), this.controls.dispose(), this.renderer.dispose(), this.resetSkin(), this.resetCape(), this.resetEars(), this.background = null, this.fxaaPass.fsQuad.dispose()
        }

        get disposed() {
            return this._disposed
        }

        get renderPaused() {
            return this._renderPaused
        }

        set renderPaused(e) {
            this._renderPaused = e, this._renderPaused && null !== this.animationID ? (window.cancelAnimationFrame(this.animationID), this.animationID = null, this.clock.stop(), this.clock.autoStart = !0) : this._renderPaused || this._disposed || this.renderer.getContext().isContextLost() || null != this.animationID || (this.animationID = window.requestAnimationFrame(() => this.draw()))
        }

        get width() {
            return this.renderer.getSize(new x).width
        }

        set width(e) {
            this.setSize(e, this.height)
        }

        get height() {
            return this.renderer.getSize(new x).height
        }

        set height(e) {
            this.setSize(this.width, e)
        }

        get background() {
            return this.scene.background
        }

        set background(e) {
            null === e || e instanceof te || e instanceof F ? this.scene.background = e : this.scene.background = new te(e), null !== this.backgroundTexture && e !== this.backgroundTexture && (this.backgroundTexture.dispose(), this.backgroundTexture = null)
        }

        adjustCameraDistance() {
            let e = 4.5 + 16.5 / Math.tan(this.fov / 180 * Math.PI / 2) / this.zoom;
            e < 10 ? e = 10 : e > 256 && (e = 256), this.camera.position.multiplyScalar(e / this.camera.position.length()), this.camera.updateProjectionMatrix()
        }

        resetCameraPose() {
            this.camera.position.set(0, 0, 1), this.camera.rotation.set(0, 0, 0), this.adjustCameraDistance()
        }

        get fov() {
            return this.camera.fov
        }

        set fov(e) {
            this.camera.fov = e, this.adjustCameraDistance()
        }

        get zoom() {
            return this._zoom
        }

        set zoom(e) {
            this._zoom = e, this.adjustCameraDistance()
        }

        get pixelRatio() {
            return this._pixelRatio
        }

        set pixelRatio(e) {
            "match-device" === e ? "match-device" !== this._pixelRatio && (this._pixelRatio = e, this.onDevicePixelRatioChange()) : ("match-device" === this._pixelRatio && null !== this.devicePixelRatioQuery && (this.devicePixelRatioQuery.removeEventListener("change", this.onDevicePixelRatioChange), this.devicePixelRatioQuery = null), this._pixelRatio = e, this.renderer.setPixelRatio(e), this.updateComposerSize())
        }

        get animation() {
            return this._animation
        }

        set animation(e) {
            this._animation !== e && (this.playerObject.resetJoints(), this.playerObject.position.set(0, 0, 0), this.playerObject.rotation.set(0, 0, 0), this.clock.stop(), this.clock.autoStart = !0), null !== e && (e.progress = 0), this._animation = e
        }

        get nameTag() {
            return this._nameTag
        }

        set nameTag(e) {
            null !== this._nameTag && this.playerWrapper.remove(this._nameTag), null !== e && (e instanceof ej || (e = new od(e)), this.playerWrapper.add(e), e.position.y = 20), this._nameTag = e
        }

        constructor(e = {}) {
            let t;
            op(this, "canvas", void 0), op(this, "scene", void 0), op(this, "camera", void 0), op(this, "renderer", void 0), op(this, "controls", void 0), op(this, "playerObject", void 0), op(this, "playerWrapper", void 0), op(this, "globalLight", new sz(16777215, 3)), op(this, "cameraLight", new sO(16777215, .6)), op(this, "composer", void 0), op(this, "renderPass", void 0), op(this, "fxaaPass", void 0), op(this, "skinCanvas", void 0), op(this, "capeCanvas", void 0), op(this, "earsCanvas", void 0), op(this, "skinTexture", null), op(this, "capeTexture", null), op(this, "earsTexture", null), op(this, "backgroundTexture", null), op(this, "_disposed", !1), op(this, "_renderPaused", !1), op(this, "_zoom", void 0), op(this, "autoRotate", !1), op(this, "autoRotateSpeed", 1), op(this, "_animation", void 0), op(this, "clock", void 0), op(this, "animationID", void 0), op(this, "onContextLost", void 0), op(this, "onContextRestored", void 0), op(this, "_pixelRatio", void 0), op(this, "devicePixelRatioQuery", void 0), op(this, "onDevicePixelRatioChange", void 0), op(this, "_nameTag", null), this.canvas = void 0 === e.canvas ? document.createElement("canvas") : e.canvas, this.skinCanvas = document.createElement("canvas"), this.capeCanvas = document.createElement("canvas"), this.earsCanvas = document.createElement("canvas"), this.scene = new ss, this.camera = new tG, this.camera.add(this.cameraLight), this.scene.add(this.camera), this.scene.add(this.globalLight), this.renderer = new sn({
                canvas: this.canvas,
                preserveDrawingBuffer: !0 === e.preserveDrawingBuffer
            }), this.onDevicePixelRatioChange = () => {
                this.renderer.setPixelRatio(window.devicePixelRatio), this.updateComposerSize(), "match-device" === this._pixelRatio && (this.devicePixelRatioQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`), this.devicePixelRatioQuery.addEventListener("change", this.onDevicePixelRatioChange, {once: !0}))
            }, void 0 === e.pixelRatio || "match-device" === e.pixelRatio ? (this._pixelRatio = "match-device", this.devicePixelRatioQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`), this.devicePixelRatioQuery.addEventListener("change", this.onDevicePixelRatioChange, {once: !0}), this.renderer.setPixelRatio(window.devicePixelRatio)) : (this._pixelRatio = e.pixelRatio, this.devicePixelRatioQuery = null, this.renderer.setPixelRatio(e.pixelRatio)), this.renderer.setClearColor(0, 0), this.renderer.capabilities.isWebGL2 && (t = new H(0, 0, {depthTexture: new st(0, 0, 1015)})), this.composer = new ol(this.renderer, t), this.renderPass = new oh(this.scene, this.camera), this.fxaaPass = new on(oc), this.composer.addPass(this.renderPass), this.composer.addPass(this.fxaaPass), this.playerObject = new sJ, this.playerObject.name = "player", this.playerObject.skin.visible = !1, this.playerObject.cape.visible = !1, this.playerWrapper = new n7, this.playerWrapper.add(this.playerObject), this.scene.add(this.playerWrapper), this.controls = new s9(this.camera, this.canvas), this.controls.enablePan = !1, this.controls.minDistance = 10, this.controls.maxDistance = 256, !1 === e.enableControls && (this.controls.enabled = !1), void 0 !== e.skin && this.loadSkin(e.skin, {
                model: e.model,
                ears: "current-skin" === e.ears
            }), void 0 !== e.cape && this.loadCape(e.cape), void 0 !== e.ears && "current-skin" !== e.ears && this.loadEars(e.ears.source, {textureType: e.ears.textureType}), void 0 !== e.width && (this.width = e.width), void 0 !== e.height && (this.height = e.height), void 0 !== e.background && (this.background = e.background), void 0 !== e.panorama && this.loadPanorama(e.panorama), void 0 !== e.nameTag && (this.nameTag = e.nameTag), this.camera.position.z = 1, this._zoom = void 0 === e.zoom ? .9 : e.zoom, this.fov = void 0 === e.fov ? 50 : e.fov, this._animation = void 0 === e.animation ? null : e.animation, this.clock = new sF, !0 === e.renderPaused ? (this._renderPaused = !0, this.animationID = null) : this.animationID = window.requestAnimationFrame(() => this.draw()), this.onContextLost = e => {
                e.preventDefault(), null !== this.animationID && (window.cancelAnimationFrame(this.animationID), this.animationID = null)
            }, this.onContextRestored = () => {
                this.renderer.setClearColor(0, 0), this._renderPaused || this._disposed || null !== this.animationID || (this.animationID = window.requestAnimationFrame(() => this.draw()))
            }, this.canvas.addEventListener("webglcontextlost", this.onContextLost, !1), this.canvas.addEventListener("webglcontextrestored", this.onContextRestored, !1)
        }
    }, e.WalkingAnimation = class extends om {
        animate(e) {
            let t = 8 * this.progress;
            e.skin.leftLeg.rotation.x = .5 * Math.sin(t), e.skin.rightLeg.rotation.x = .5 * Math.sin(t + Math.PI), e.skin.leftArm.rotation.x = .5 * Math.sin(t + Math.PI), e.skin.rightArm.rotation.x = .5 * Math.sin(t);
            let i = .02 * Math.PI;
            e.skin.leftArm.rotation.z = .03 * Math.cos(t) + i, e.skin.rightArm.rotation.z = .03 * Math.cos(t + Math.PI) - i, this.headBobbing ? (e.skin.head.rotation.y = .2 * Math.sin(t / 4), e.skin.head.rotation.x = .1 * Math.sin(t / 5)) : (e.skin.head.rotation.y = 0, e.skin.head.rotation.x = 0), e.cape.rotation.x = .06 * Math.sin(t / 1.5) + .06 * Math.PI
        }

        constructor(...e) {
            super(...e), of(this, "headBobbing", !0)
        }
    }
});//# sourceMappingURL=skinview3d.bundle.js.map