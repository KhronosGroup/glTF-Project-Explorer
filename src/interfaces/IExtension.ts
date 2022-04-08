/**
 * Represents the status of the Extension. Value is meant to be used as the label in the interface.
 */
export enum ExtensionStatus {
  Ratified = "Ratified",
  MultiVendor = "Multi-Vendor",
  Vendor = "Vendor",
  Archived = "Archived",
  ReadyForTesting = "Ready for testing",
  InDevelopment = "In development",
}

export interface IExtension {
  name: string;
  status: ExtensionStatus;
  description?: string;
}
