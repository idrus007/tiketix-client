import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  createCityThunk,
  deleteCityThunk,
  fetchCitiesThunk,
  updateCityThunk,
} from "@/store/citySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export default function CityList() {
  const dispatch = useAppDispatch();
  const { cities, loading, error } = useAppSelector((state) => state.cities);
  const [newCityName, setNewCityName] = useState("");
  const [editCity, setEditCity] = useState<{ id: number; name: string } | null>(
    null
  );

  // Load cities
  useEffect(() => {
    dispatch(fetchCitiesThunk());
  }, [dispatch]);

  // Buat kota baru
  const handleCreate = () => {
    if (newCityName.trim()) {
      dispatch(createCityThunk({ name: newCityName }));
      setNewCityName("");
    }
  };

  // Edit kota
  const handleEdit = () => {
    if (editCity && editCity.name.trim()) {
      dispatch(
        updateCityThunk({ id: editCity.id, data: { name: editCity.name } })
      );
      setEditCity(null);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Cities</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center p-4 pt-0">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data Kota</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {Array.isArray(cities) && cities.length > 0 ? (
              <ul className="space-y-2">
                {cities.map((city) => (
                  <li
                    key={city.id}
                    className="flex items-center justify-between border rounded p-2"
                  >
                    <span>{city.name}</span>
                    <div className="space-x-2">
                      {/* Button Edit */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setEditCity({ id: city.id, name: city.name })
                            }
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Kota</DialogTitle>
                          </DialogHeader>
                          <Input
                            value={editCity?.name || ""}
                            onChange={(e) =>
                              setEditCity(
                                (prev) =>
                                  prev && { ...prev, name: e.target.value }
                              )
                            }
                            placeholder="Nama kota"
                          />
                          <DialogFooter>
                            <Button onClick={handleEdit}>Simpan</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Button Hapus */}
                      <Button
                        variant="destructive"
                        onClick={() => dispatch(deleteCityThunk(city.id))}
                      >
                        Hapus
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada data kota</p>
            )}

            {/* Tombol Tambah Kota */}
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Tambah Kota</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Kota Baru</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    placeholder="Nama kota baru"
                  />
                  <DialogFooter>
                    <Button onClick={handleCreate}>Simpan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
