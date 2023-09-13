import { dbData } from "@/db/dbConn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let post = JSON.parse(req.body);

    //SELECT
    if (post.s) {
      try {
        const q = `SELECT * FROM t_pengaduan`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT BY ID
    if (post.sid) {
      try {
        const q = `SELECT * FROM t_pengaduan WHERE id=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //INSERT
    if (post.i) {
      try {
        const q = `INSERT INTO t_pengaduan VALUES( ${post.id}, '${post.judul_laporan}', '${post.terlapor}', ${post.kode_etik}, ${post.kedisiplinan}, ${post.mal_administrasi}, ${post.penyalahgunaan_wewenang}, ${post.perbuatan_tercela}, ${post.pelayanan_publik}, ${post.pelanggaran_sumpah},${post.pelanggaran_hukum}, '${post.lainnya}', '${post.nama_pelapor}', '${post.alamat_pelapor}', '${post.tlp_pelapor}', '${post.email}', '${post.keterangan}', '${post.file}',CURRENT_TIMESTAMP);`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //UPDATE
    if (post.e) {
      try {
        const q = `UPDATE t_pengaduan SET id=${post.id}, judul_laporan='${post.judul_laporan}', terlapor='${post.terlapor}', kode_etik='${post.kode_etik}', kedisiplinan='${post.kedisiplinan}', mal_administrasi='${post.mal_administrasi}', penyalahgunaan_wewenang='${post.penyalahgunaan_wewenang}', perbuatan_tercela='${post.perbuatan_tercela}', pelayanan_publik='${post.pelayanan_publik}', pelanggaran_hukum='${post.pelanggaran_hukum}', lainnya='${post.lainnya}', nama_pelapor='${post.nama_pelapor}', alamat_pelapor='${post.alamat_pelapor}', tlp_pelapor='${post.tlp_pelapor}', email='${post.email}', keterangan='${post.keterangan}', file='${post.file}' WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE
    if (post.d) {
      try {
        const q = `DELETE FROM t_pengaduan WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }
  } else {
    res.status(200).json(false);
  }
}
