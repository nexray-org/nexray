import { faker } from '@faker-js/faker';
import React, { createContext, useMemo, useState } from 'react';
import useConfig from '../hooks/useConfig';
import { SchemaData } from '../types';

interface IUiContext {
    selectedCategoryId: string;
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
    data: SchemaData['request'];
    config: ReturnType<typeof useConfig>;
    activeItem: SchemaData['request'][number] | undefined;
    insightFilter: string;
    setInsightFilter: React.Dispatch<React.SetStateAction<string>>;
    isOutputSettingsDialogOpen: boolean;
    setIsOutputSettingsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isInsightsSettingsDialogOpen: boolean;
    setIsInsightsSettingsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isInsightFilterDialogOpen: boolean;
    setInsightFilterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UiContext = createContext<IUiContext>({} as IUiContext);

export function UiProvider({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) {
    const [isOutputSettingsDialogOpen, setIsOutputSettingsDialogOpen] = useState<boolean>(false);
    const [isInsightsSettingsDialogOpen, setIsInsightsSettingsDialogOpen] = useState<boolean>(false);
    const [isInsightFilterDialogOpen, setInsightFilterDialogOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [insightFilter, setInsightFilter] = useState<string>('');
    const [data, setData] = useState<SchemaData['request']>(() =>
        [...new Array(1000)].map((_) => ({
            durationMs: faker.datatype.number({ min: 19, max: 1000000 }),
            payloadSizeBytes: faker.datatype.number({ min: 19, max: 1000000 }),
            requestIp: faker.internet.ipv4(),
            status: {
                code: faker.internet.httpStatusCode(),
                // reason: getReasonPhrase(faker.internet.httpStatusCode())
                reason: 'OK',
            },
            timestamp: faker.date.recent(100).toISOString(),
            type: faker.internet.httpMethod(),
            url: faker.internet.url(),
            id: faker.datatype.uuid(),
            contents: faker.helpers.arrayElement([
                logfile,
                'a{"hello": "world"}sdf[123, { "mif": null }]asdf[123, { "mif": null }]',
                '12345{"hello": "world"}',
            ]),
        })),
    );
    const config = useConfig();
    const activeItem = useMemo(() => data.find((ele) => ele.id === selectedCategoryId), [data, selectedCategoryId]);

    return (
        <UiContext.Provider
            value={{
                selectedCategoryId,
                setSelectedCategoryId,
                data,
                config,
                activeItem,
                insightFilter,
                setInsightFilter,
                isOutputSettingsDialogOpen,
                setIsOutputSettingsDialogOpen,
                isInsightsSettingsDialogOpen,
                setIsInsightsSettingsDialogOpen,
                isInsightFilterDialogOpen,
                setInsightFilterDialogOpen,
            }}
        >
            {children}
        </UiContext.Provider>
    );
}

const logfile = `01 03/22 08:51:01 INFO   :.main: *************** RSVP Agent started ***************
 02 
03/22 08:51:01 INFO   :...locate_configFile: Specified configuration file: /u/user10/rsvpd1.conf
03/22 08:51:01 INFO   :.main: Using log level 511
03/22 08:51:01 INFO   :..settcpimage: Get TCP images rc - EDC8112I Operation not supported on socket.
 03 
03/22 08:51:01 INFO   :..settcpimage: Associate with TCP/IP image name = TCPCS
03/22 08:51:02 INFO   :..reg_process: registering process with the system
03/22 08:51:02 INFO   :..reg_process: attempt OS/390 registration
03/22 08:51:02 INFO   :..reg_process: return from registration rc=0
 04 
03/22 08:51:06 TRACE  :...read_physical_netif: Home list entries returned = 7
03/22 08:51:06 INFO   :...read_physical_netif: index #0, interface VLINK1 has address 129.1.1.1, ifidx 0
03/22 08:51:06 INFO   :...read_physical_netif: index #1, interface TR1 has address 9.37.65.139, ifidx 1
03/22 08:51:06 INFO   :...read_physical_netif: index #2, interface LINK11 has address 9.67.100.1, ifidx 2
03/22 08:51:06 INFO   :...read_physical_netif: index #3, interface LINK12 has address 9.67.101.1, ifidx 3
03/22 08:51:06 INFO   :...read_physical_netif: index #4, interface CTCD0 has address 9.67.116.98, ifidx 4
03/22 08:51:06 INFO   :...read_physical_netif: index #5, interface CTCD2 has address 9.67.117.98, ifidx 5
03/22 08:51:06 INFO   :...read_physical_netif: index #6, interface LOOPBACK has address 127.0.0.1, ifidx 0
03/22 08:51:06 INFO   :....mailslot_create: creating mailslot for timer
03/22 08:51:06 INFO   :...mailbox_register: mailbox allocated for timer
 05 
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :...read_physical_netif: index #1, interface TR1 has address 9.37.65.139, ifidx 1
03/22 08:51:06 INFO   :...read_physical_netif: index #2, interface LINK11 has address 9.67.100.1, ifidx 2
03/22 08:51:06 INFO   :...read_physical_netif: index #3, interface LINK12 has address 9.67.101.1, ifidx 3
03/22 08:51:06 INFO   :...read_physical_netif: index #4, interface CTCD0 has address 9.67.116.98, ifidx 4
03/22 08:51:06 INFO   :...read_physical_netif: index #5, interface CTCD2 has address 9.67.117.98, ifidx 5
03/22 08:51:06 INFO   :...read_physical_netif: index #6, interface LOOPBACK has address 127.0.0.1, ifidx 0
03/22 08:51:06 INFO   :....mailslot_create: creating mailslot for timer
03/22 08:51:06 INFO   :...mailbox_register: mailbox allocated for timer
 05 
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
 06 
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 129.1.1.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.37.65.139, entity for rsvp allocated and 
initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.101.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.116.98, entity for rsvp allocated and 
initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.117.98, entity for rsvp allocated and 
03/22 08:51:06 INFO   :...read_physical_netif: index #1, interface TR1 has address 9.37.65.139, ifidx 1
03/22 08:51:06 INFO   :...read_physical_netif: index #2, interface LINK11 has address 9.67.100.1, ifidx 2
03/22 08:51:06 INFO   :...read_physical_netif: index #3, interface LINK12 has address 9.67.101.1, ifidx 3
03/22 08:51:06 INFO   :...read_physical_netif: index #4, interface CTCD0 has address 9.67.116.98, ifidx 4
03/22 08:51:06 INFO   :...read_physical_netif: index #5, interface CTCD2 has address 9.67.117.98, ifidx 5
03/22 08:51:06 INFO   :...read_physical_netif: index #6, interface LOOPBACK has address 127.0.0.1, ifidx 0
03/22 08:51:06 INFO   :....mailslot_create: creating mailslot for timer
03/22 08:51:06 INFO   :...mailbox_register: mailbox allocated for timer
 05 
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
 06 
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 129.1.1.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.37.65.139, entity for rsvp allocated and 
initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.101.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.116.98, entity for rsvp allocated and 
initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.117.98, entity for rsvp allocated and 
 06 
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 129.1.1.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.37.65.139, entity for rsvp allocated and 
initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 WARNING:.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.101.1, entity for rsvp allocated and initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating 12345{"hello": "world"}mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.116.98, entity for rsvp allocated and 
initialized
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp
03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP
03/22 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp
03/22 08:51:06 TRACE  :..entity_initialize: interface 9.67.117.98, entity for rsvp allocated and 
initialized`;
