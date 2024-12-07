const folder = {
    _partials : 'code yg ditulis khusus agar halaman/component utama tidak teralu panjang',
    _components: 'partial code yang mungkin digunakan di halaman lain',
    _utils: 'folder untuk menyimpan partial function/helper',
    _trash: 'folder untuk menyimpan code yg tidak berguna (extensi file harus dihapus)',
    _context: 'folder untuk wrapper context',
    external: 'code yg kemungkinan dipakai di sub app lain'
};
const rules = [
    'folder non page harus ditaruh pada folder first route',
    'interface ditaruh pada file utama bussines'
];
const plan = 'switch from app router to page router';

const note = 'fetcher dengan endpoint berbeda dibuatkan independen function';