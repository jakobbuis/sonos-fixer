const { DeviceDiscovery } = require('sonos');

const zones = [
    { name: 'Hammertime', devices: ['5C-AA-FD-46-C5-EE:A'] },
    { name: 'Discotheek', devices: ['5C-AA-FD-4E-CA-3C:F'] },
    { name: 'Groene Hoek', devices: ['5C-AA-FD-06-F2-00:8'] },
    { name: 'HOK', devices: ['5C-AA-FD-4E-CB-68:9', '94-9F-3E-71-C5-E4:5'] },
    { name: 'Keuken', devices: ['5C-AA-FD-06-F2-12:9'] },
    { name: 'Noord-Korea', devices: ['94-9F-3E-71-C6-70:9'] },
    { name: 'Rem[ck]o', devices: ['94-9F-3E-0E-21-48:B'] },
    { name: 'Treincabines', devices: ['5C-AA-FD-46-C6-52:8'] },
    { name: 'Zuid-Korea', devices: ['5C-AA-FD-46-C5-E4:0'] },
    { name: 'Peach Tent', devices: ['5C-AA-FD-46-C5-CC:A'] },
];

DeviceDiscovery(async device => {
    // Find the right zone for this device
    const info = await device.getZoneInfo();
    const serial = info.SerialNumber;
    const zone = zones.filter(z => z.devices.includes(serial))[0];
    if (!zone) {
        console.log(`Device ${serial} has no defined zone set`);
        return;
    }
    // join device to its intended zone
    console.log(`Forcing ${serial} to join ${zone.name}`);
    device
        .joinGroup(zone)
        .then(success => {
            console.log(success ? 'Success' : 'Failure');
        })
        .catch(err => {
            console.log('Error joining device %j', err);
        });
});
