import { ExtensionStatus, IExtension } from "../interfaces/IExtension";
import { IProjectInfo } from "../interfaces/IProjectInfo";

// Despite the data being a static file, we don't pull it in using Webpack so
//   we can change to using a restful service in the future.
export function fetchProjects(): Promise<IProjectInfo[]> {
  return fetch(`${process.env.PUBLIC_URL}/data/glTF-projects-data.json`)
    .then((r) => r.json())
    .catch((error) => console.error(`Error fetching data. Reason: ${error}`));
}

export function fetchProjectsWithId(): Promise<IProjectInfo[]> {
  return new Promise(async (resolve) => {
    const projects = await fetchProjects();

    let id = 0;
    resolve(
      projects.map((p) => {
        // This work gives us a stable key. Eventually when this is database
        // backed the ID will be provided by the DB and this can be removed.
        p.id = id++;
        return p;
      })
    );
  });
}

/**
 * Fetches Extensions.
 *
 * NOTE: Currently not from server: abstracted out to make fetching from a server easier in the future.
 */
export function fetchExtensions(): Promise<IExtension[]> {
  return new Promise((resolve) =>
    resolve([
      /* Ratified */
      {
        name: "KHR_draco_mesh_compression",
        status: ExtensionStatus.Ratified,
        description:
          "This extension defines a schema to use Draco geometry compression (non-normative) libraries in glTF format.",
      },
      { name: "KHR_lights_punctual", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_clearcoat", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_ior", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_sheen", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_specular", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_transmission", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_unlit", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_variants", status: ExtensionStatus.Ratified },
      { name: "KHR_materials_volume", status: ExtensionStatus.Ratified },
      { name: "KHR_mesh_quantization", status: ExtensionStatus.Ratified },
      { name: "KHR_texture_basisu", status: ExtensionStatus.Ratified },
      { name: "KHR_texture_transform", status: ExtensionStatus.Ratified },
      { name: "KHR_xmp_json_ld", status: ExtensionStatus.Ratified },

      /* Multi-Vendor */
      { name: "EXT_lights_image_based", status: ExtensionStatus.MultiVendor },
      { name: "EXT_mesh_gpu_instancing", status: ExtensionStatus.MultiVendor },
      { name: "EXT_meshopt_compression", status: ExtensionStatus.MultiVendor },
      { name: "EXT_texture_webp", status: ExtensionStatus.MultiVendor },

      /* Vendor */
      {
        name: "ADOBE_materials_clearcoat_specular",
        status: ExtensionStatus.Vendor,
      },
      {
        name: "ADOBE_materials_thin_transparency",
        status: ExtensionStatus.Vendor,
      },
      { name: "AGI_articulations", status: ExtensionStatus.Vendor },
      { name: "AGI_stk_metadata", status: ExtensionStatus.Vendor },
      { name: "CESIUM_primitive_outline", status: ExtensionStatus.Vendor },
      { name: "FB_geometry_metadata", status: ExtensionStatus.Vendor },
      { name: "MSFT_lod", status: ExtensionStatus.Vendor },
      {
        name: "MSFT_packing_normalRoughnessMetallic",
        status: ExtensionStatus.Vendor,
      },
      {
        name: "MSFT_packing_occlusionRoughnessMetallic",
        status: ExtensionStatus.Vendor,
      },
      { name: "MSFT_texture_dds", status: ExtensionStatus.Vendor },

      /* Archived */
      { name: "KHR_techniques_webgl", status: ExtensionStatus.Archived },
      {
        name: "KHR_materials_pbrSpecularGlossiness",
        status: ExtensionStatus.Archived,
      },
      { name: "KHR_xmp", status: ExtensionStatus.Archived },

      /* In-Progress */
      {
        name: "KHR_materials_emissive_strength",
        status: ExtensionStatus.ReadyForTesting,
      },
      {
        name: "KHR_materials_iridescence",
        status: ExtensionStatus.ReadyForTesting,
      },
      {
        name: "KHR_materials_anisotropy",
        status: ExtensionStatus.ReadyForTesting,
      },
      {
        name: "KHR_materials_translucency",
        status: ExtensionStatus.InDevelopment,
      },
      { name: "KHR_materials_sss", status: ExtensionStatus.InDevelopment },
      { name: "KHR_animation2", status: ExtensionStatus.InDevelopment },
    ])
  );
}
