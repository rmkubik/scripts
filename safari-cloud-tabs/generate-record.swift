import CloudKit
import Foundation

let args = CommandLine.arguments

let tabUUID = args[1]
let deviceUUID = args[2]
let url = args[3]

let requestUUID = UUID().uuidString

let zoneID = CKRecordZone.ID(
    zoneName: "CloudTabs",
    ownerName: CKCurrentUserDefaultName
)

let recordID = CKRecord.ID(
    recordName: requestUUID,
    zoneID: zoneID
)

let record = CKRecord(
    recordType: "CloudTabCloseRequest",
    recordID: recordID
)

// Application-level fields
record["close_request_uuid"] = requestUUID
record["tab_uuid"] = tabUUID
record["destination_device_uuid"] = deviceUUID
record["url"] = url

// Archive CloudKit system metadata
let archiver = NSKeyedArchiver(
    requiringSecureCoding: true
)

record.encodeSystemFields(with: archiver)

let systemFields = archiver.encodedData

try systemFields.write(
    to: URL(fileURLWithPath: "/tmp/system-fields.bin")
)

print(systemFields.base64EncodedString())