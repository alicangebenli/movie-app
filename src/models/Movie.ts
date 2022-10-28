export default class MovieModel {
    constructor(
        public id: number = 0,
        public title: string = '',
        public image: string = '',
        public description: string = '',
        public vote: number = 0
    ) {
    }
}