import { dateToTable } from "@/db/dateformat";
import { useEffect, useState } from "react";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

export default function BackEnd() {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch("/api/pengaduan", {
      method: "POST",
      body: JSON.stringify({ s: true }),
    })
      .then((e) => e.json())
      .then((data) => {
        setInitialData(data);
        setData(data);
      });
  }

  async function hapus(data) {
    Swal.fire({
      title: "Hapus",
      text: "Apakah anda ingin menghapus data ini ?",
      icon: "question",
      showCloseButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
    }).then(async (e) => {
      if (e.isConfirmed) {
        await fetch("/api/pengaduan", {
          method: "POST",
          body: JSON.stringify({ d: true, id: data.id }),
        })
          .then((e) => e.json())
          .then((data) => {
            if (data) {
              Swal.fire("Sukses", "Data berhasil disimpan", "success");
            } else {
              Swal.fire("Gagal", "Terjadi kesalahan", "error");
            }
            getData();
          });
      }
    });
  }

  function cari(val) {
    setData(
      initialData.filter((d) => {
        return JSON.stringify(d).toLowerCase().indexOf(val.toLowerCase()) >= 0;
      })
    );
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="font-bold self-center">Daftar Laporan Pengaduan ASN</h2>
      <div className="join flex ">
        <input
          className=" flex-1 input input-bordered "
          placeholder="Cari.."
          onChange={(e) => cari(e.currentTarget.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-pin-rows ">
          <thead className="">
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Tanggal</th>
              <th rowSpan={2}>Judul Laporan</th>
              <th rowSpan={2}>Nama ASN Terlapor</th>
              <th rowSpan={2}>Kategori</th>
              <th colSpan={4}>Pelapor</th>
              <th rowSpan={2}>Keterangan</th>
              <th rowSpan={2}></th>
            </tr>
            <tr>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {!data ||
              (data.length <= 0 && (
                <tr>
                  <td colSpan={99} className=" text-center">
                    Tidak ada data
                  </td>
                </tr>
              ))}
            {data &&
              data.map((d, k) => (
                <tr>
                  <td>{k + 1}</td>
                  <td className="whitespace-nowrap">{dateToTable(d.tgl)}</td>
                  <td>{d.judul_laporan}</td>
                  <td>{d.terlapor}</td>
                  <td>
                    <div className="flex flex-col whitespace-nowrap">
                      {d.kode_etik ? <div> Kode Etik </div> : ""}
                      {d.kedisiplinan ? <div> Kedisiplinan </div> : ""}
                      {d.mal_administrasi ? <div> Mal Administrasi </div> : ""}
                      {d.penyalahgunaan_wewenang ? (
                        <div> Penyalahgunaan Wewenang </div>
                      ) : (
                        ""
                      )}
                      {d.perbuatan_tercela ? (
                        <div> Perbuatan Tercela </div>
                      ) : (
                        ""
                      )}

                      {d.pelayanan_publik ? <div> Pelayanan Publik </div> : ""}
                      {d.pelanggaran_sumpah ? (
                        <div> Pelanggaran Sumpah Jabatan </div>
                      ) : (
                        ""
                      )}

                      {d.pelanggaran_hukum ? (
                        <div> Pelanggaran Hukum </div>
                      ) : (
                        ""
                      )}

                      <div>{d.lainnya}</div>
                    </div>
                  </td>
                  <td>{d.nama_pelapor}</td>
                  <td>{d.alamat_pelapor}</td>
                  <td>{d.tlp_pelapor}</td>
                  <td>{d.email}</td>
                  <td>{d.keterangan}</td>
                  {/* <td>{d.file}</td> */}
                  <td>
                    <div className="join">
                      <button
                        className="btn btn-sm join-item"
                        onClick={() => hapus(d)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
