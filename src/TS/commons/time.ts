

class TimeInit {
    year: string | number
    month: string | number
    day: string | number
    hour: string | number
    min: string | number
    sec: string | number
    constructor() {
        this.year = 0
        this.month = 0
        this.day = 0
        this.hour = 0
        this.min = 0
        this.sec = 0
    }
    formatDate = (datetime: Date) => {
        this.year = datetime.getFullYear(),
            this.month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1)
                : datetime.getMonth() + 1,
            this.day = datetime.getDate() < 10 ? '0' + datetime.getDate()
                : datetime.getDate(),
            this.hour = datetime.getHours() < 10 ? '0' + datetime.getHours()
                : datetime.getHours(),
            this.min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes()
                : datetime.getMinutes(),
            this.sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds()
                : datetime.getSeconds();
        return this.year + '-' + this.month + '-' + this.day
         + " " + this.hour + ':' + this.min + ':' + this.sec;
    }
    nowDate = (params: string | number) => {
        // let time1 = "2016-01-01 17:22:37";
        let date = typeof params == 'string' ? new Date(params.replace(/-/g, "/")) : new Date(params); //开始时间
        return date.getTime();
    }
    rePairo = (m: string | number) => {
        return m < 10 ? '0' + m : m
    }
    reTime = (date: string | number) => {
        let times = new Date(date).getTime()
        let time = new Date(times);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.rePairo(m)
            + '-' + this.rePairo(d)
            + ' ' + this.rePairo(h)
            + ':' + this.rePairo(mm)
            + ':' + this.rePairo(s);
        // 
        // let json_date = new Date(date).toJSON();
        // return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
    }
}


export {
    TimeInit
}