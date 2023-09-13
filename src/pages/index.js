import { Form, Formik, Field, withFormik } from "formik";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex gap-5 items-center mb-5">
        <div>
          <img
            style={{
              margin: "8px auto 0px",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              fontSize: 15,
              textAlign: "justify",
              display: "block",
            }}
            title=""
            src="/logo-sml.png"
            alt=""
            width={75}
            height={88}
          />
        </div>
        <div>
          <div>
            <p>
              <strong>
                FORMULIR PENGADUAN APARATUR SIPIL NEGARA KABUPATEN SIMEULUE
              </strong>
            </p>
            <p>
              BADAN KEPEGAWAIAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KABUPATEN
              SIMEULUE
            </p>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "justify" }}>Dengan hormat,</p>
      <p style={{ textAlign: "justify" }} className="mb-4">
        Bersama ini saya yang namanya tertera di bawah ini, melaporkan adanya
        dugaan tindakan penyalahgunaan wewenang Aparatur Sipil Negara (ASN) yang
        dilakukan oleh petugas/pegawai Kabupaten Simeulue.
      </p>

      <p style={{ textAlign: "justify" }}>
        Adapun data diri saya dan kronologi kejadiannya adalah sebagai berikut :
      </p>
      <Formik
        initialValues={{
          i: true,
          id: null,
          judul_laporan: "",
          terlapor: "",
          kode_etik: false,
          kedisiplinan: false,
          mal_administrasi: false,
          penyalahgunaan_wewenang: false,
          perbuatan_tercela: false,
          pelayanan_publik: false,
          pelanggaran_sumpah: false,
          pelanggaran_hukum: false,
          lainnya: "",
          nama_pelapor: "",
          alamat_pelapor: "",
          tlp_pelapor: "",
          email: "",
          keterangan: "",
          file: "",
        }}
        onSubmit={async (value) => {
          await fetch("/api/pengaduan", {
            method: "POST",
            body: JSON.stringify(value),
          })
            .then((e) => e.json())
            .then((data) => {
              if (data) {
                Swal.fire(
                  "Terima Kasih",
                  "Pengaduan anda telah diterima",
                  "success"
                );
              } else {
                Swal.fire("Gagal", "Terjadi kesalahan", "error");
              }
            });
        }}
      >
        <Form>
          <div className="flex flex-col gap-3">
            <table
              style={{ width: "100%", borderCollapse: "collapse" }}
              border={0}
              cellPadding={3}
              className="mt-5"
            >
              <tbody>
                <tr>
                  <td style={{ width: "433.2px" }}>
                    <strong>
                      Judul Laporan &nbsp;
                      <span style={{ color: "#ff0000" }}>*</span>
                    </strong>
                  </td>
                  <td style={{ width: "433.2px" }}>
                    <strong>
                      Nama ASN Terlapor &nbsp;
                      <span style={{ color: "#ff0000" }}>*</span>
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "433.2px" }}>
                    <Field
                      required
                      name="judul_laporan"
                      style={{ width: "100%" }}
                      className="border border-black px-3 py-2"
                      type="text"
                    />
                  </td>
                  <td style={{ width: "433.2px" }}>
                    <Field
                      required
                      name="terlapor"
                      style={{ width: "100%" }}
                      className="border border-black px-3 py-2"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <strong>Kategori Pengaduan Perilaku ASN</strong>

            <div>
              <span>Centang yang sesuai (boleh lebih dari 1)</span>
              <table
                style={{ width: "100%", borderCollapse: "collapse" }}
                border={0}
              >
                <tbody>
                  <tr>
                    <td style={{ width: "50%" }}>
                      <div>
                        <Field name="kode_etik" type="checkbox" /> Kode Etik
                      </div>
                      <div>
                        <Field name="kedisiplinan" type="checkbox" />{" "}
                        Kedisiplinan
                      </div>
                      <div>
                        <Field name="mal_administrasi" type="checkbox" /> Mal
                        Administrasi
                      </div>
                      <div>
                        <Field name="penyalahgunaan_wewenang" type="checkbox" />{" "}
                        Penyalahgunaan Wewenang
                      </div>
                      <div>
                        <Field name="perbuatan_tercela" type="checkbox" />{" "}
                        Perbuatan Tercela
                      </div>
                    </td>
                    <td style={{ width: "50%" }}>
                      <div>
                        <Field name="pelayanan_publik" type="checkbox" />{" "}
                        Pelayanan Publik
                      </div>
                      <div>
                        <Field name="pelanggaran_sumpah" type="checkbox" />{" "}
                        Pelanggaran Sumpah Jabatan
                      </div>
                      <div>
                        <Field name="pelanggaran_hukum" type="checkbox" />{" "}
                        Pelanggaran Hukum
                      </div>
                      <div className="mt-2">Lainnya</div>
                      <div>
                        <Field
                          style={{ width: "100%" }}
                          name="lainnya"
                          className="border border-black px-3 py-2"
                          type="text"
                          placeholder="Lainnya"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <strong>Identitas Pelapor</strong>
              </div>
              <div>
                <div>
                  Nama Lengkap&nbsp;<span style={{ color: "#ff0000" }}>*</span>
                </div>
                <Field
                  required
                  name="nama_pelapor"
                  style={{ width: "100%" }}
                  className="border border-black px-3 py-2"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <div>Alamat</div>
                <Field
                  required
                  name="alamat_pelapor"
                  style={{ width: "100%" }}
                  className="border border-black px-3 py-2"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <div>
                  Telepon/Hp&nbsp;<span style={{ color: "#ff0000" }}>*</span>
                </div>
                <Field
                  required
                  name="tlp_pelapor"
                  style={{ width: "100%" }}
                  className="border border-black px-3 py-2"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <div>
                  E-mail&nbsp;<span style={{ color: "#ff0000" }}>*</span>
                </div>
                <Field
                  required
                  name="email"
                  style={{ width: "100%" }}
                  className="border border-black px-3 py-2"
                  type="text"
                  placeholder=""
                />
              </div>
              <div>
                <div>
                  Keterangan Laporan&nbsp;
                  <span style={{ color: "#ff0000" }}>*</span>
                </div>

                <Field
                  required
                  component="textarea"
                  name="keterangan"
                  className="w-full  border border-black px-3 py-2"
                />
              </div>
              <div>
                <div>
                  Upload Bukti&nbsp;<span style={{ color: "#ff0000" }}>*</span>
                </div>
                <Field
                  required
                  name="file"
                  style={{ width: "100%" }}
                  className="border border-black px-3 py-2"
                  type="file"
                  placeholder=""
                />
              </div>
              <button
                id="kirimlaporan "
                type="submit"
                className="btn btn-default save"
              >
                Kirim
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
