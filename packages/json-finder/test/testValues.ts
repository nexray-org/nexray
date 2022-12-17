export const examples = (): [string, string, any][] => [
    [
        "Empty string",
        "",
        []
    ],
    [
        "One space",
        " ",
        []
    ],
    [
        "Multi-space",
        "  \t   \n \t   ",
        []
    ],
    [
        "Character string",
        "abcdec",
        []
    ],
    [
        "Number string",
        "123",
        []
    ],
    [
        "Empty object",
        "{}",
        [{}]
    ],
    [
        "Empty object with space",
        "   {   }   ",
        [{}]
    ],
    [
        "Simple object surrounded by garbage",
        `asd"'asdff'{[a}]sdf{"hello":"world"}sdfijas"asdasfd'df{[a}]kl;ja`,
        [{"hello":"world"}]
    ],
    [
        "Three simple object surrounded by garbage",
        `asd"'as["mike"]dff'{[a}]sdf{"hello":"world"}sdfijas"asdasfd'df{[a}] SDf ["mike", "james"]kl;ja`,
        [["mike"], {"hello":"world"}, ["mike", "james"]]
    ],
    [
        "Deep empty object",
        "{{{{}}}}",
        [{}]
    ],
    [
        "Deep empty object with space",
        "    { { {  { } } }}  ",
        [{}]
    ],
    [
        "Simple deep object",
        "{{{ \"hello\": \"world\" }}}",
        [{ "hello": "world" }]
    ],
    [
        "Empty arr",
        "[]",
        [[]]
    ],
    [
        "Empty arr with space",
        "   [  ] ",
        [[]]
    ],
    [
        "Deep empty arr",
        "[[[[]]]]",
        [[[[[]]]]]
    ],
    [
        "Deep empty arr with space",
        " [   [ [ []] ]  ]     ",
        [[[[[]]]]]
    ],
    [
        "Simple deep object with nested quotes",
        `
        {{{ "hello": "world", "cap": "\\" Example text\\"", "arr": [ "hello", "world\\"world\\"world\\"", "\\"", "\\"\\"" ] }}}
        `,
        [
            { 
                "hello": "world", 
                "cap": "\" Example text\"", 
                "arr": [ 
                    "hello", 
                    "world\"world\"world\"", 
                    "\"", 
                    "\"\"" 
                ] 
            }
        ]
    ],
    [
        "Massive array with nested arrs and objects",
        `
[
"JSON Test Pattern pass1",
{"object with 1 member":["array with 1 element"]},
{},
[],
-42,
true,
false,
null,
{
    "integer": 1234567890,
    "real": -9876.543210,
    "e": 0.123456789e-12,
    "E": 1.234567890E+34,
    "":  23456789012E66,
    "zero": 0,
    "one": 1,
    "space": " ",
    "alpha": "abcdefghijklmnopqrstuvwyz",
    "ALPHA": "ABCDEFGHIJKLMNOPQRSTUVWYZ",
    "digit": "0123456789",
    "0123456789": "digit",
    "true": true,
    "false": false,
    "null": null,
    "array":[  ],
    "object":{  },
    "address": "50 St. James Street",
    "url": "http://www.JSON.org/",
    " s p a c e d " :[1,2 ,3,4,5,6,7],
    "compact":[1,2,3,4,5,6,7]
},
0.5 ,98.6, 99.44,1066,1e1,0.1e1,1e-1,1e00,2e+00,2e-00,"rosebud"
]
        `,
        [
            [
                "JSON Test Pattern pass1",
                {"object with 1 member":["array with 1 element"]},
                {},
                [],
                -42,
                true,
                false,
                null,
                {
                    "integer": 1234567890,
                    "real": -9876.543210,
                    "e": 0.123456789e-12,
                    "E": 1.234567890E+34,
                    "":  23456789012E66,
                    "zero": 0,
                    "one": 1,
                    "space": " ",
                    "alpha": "abcdefghijklmnopqrstuvwyz",
                    "ALPHA": "ABCDEFGHIJKLMNOPQRSTUVWYZ",
                    "digit": "0123456789",
                    "0123456789": "digit",
                    "true": true,
                    "false": false,
                    "null": null,
                    "array":[  ],
                    "object":{  },
                    "address": "50 St. James Street",
                    "url": "http://www.JSON.org/",
                    " s p a c e d ": [1,2,3,4,5,6,7],
                    "compact": [1,2,3,4,5,6,7]
                },
                0.5,
                98.6, 
                99.44,
                1066,
                1e1,
                0.1e1,
                1e-1,
                1e00,
                2e+00,
                2e-00,
                "rosebud"
            ]
        ]
    ],
    [
        "Massive object with nested arr",
        `
{
"integer": 1234567890,
"real": -9876.543210,
"e": 0.123456789e-12,
"E": 1.234567890E+34,
"as":  23456789012E66,
"zero": 0,
"one": 1,
"space": " ",
"alpha": "abcdefghijklmnopqrstuvwyz",
"ALPHA": "ABCDEFGHIJKLMNOPQRSTUVWYZ",
"digit": "0123456789",
"0123456789": "digit",
"true": true,
"false": false,
"null": null,
"array":[  ]
}
        `,
        [
            {
            "integer": 1234567890,
            "real": -9876.543210,
            "e": 0.123456789e-12,
            "E": 1.234567890E+34,
            "as":  23456789012E66,
            "zero": 0,
            "one": 1,
            "space": " ",
            "alpha": "abcdefghijklmnopqrstuvwyz",
            "ALPHA": "ABCDEFGHIJKLMNOPQRSTUVWYZ",
            "digit": "0123456789",
            "0123456789": "digit",
            "true": true,
            "false": false,
            "null": null,
            "array": [  ]
        }
        ]
    ],
    [
        "Massive inline string with various objs and arrs",
        `
asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, []asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{her": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }sdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{her": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }sdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{ }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{her": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }}}}}}}asdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{{"hello": "world", "ge": { "another": "obf", "wor": [{ "I": "love" }, {}, [{"json": 4}]] }sdfasdadsfasdf}{}{}{}{{}{}{}{+{}}{[]asdfasdf{}{{}}{{}}{}{}{{}{{}{}{}{}{}{}{{{{{
        `,
        [
            {
                'I': 'love'
            }, {
                'hello': 'world',
                'ge': {
                    'another': 'obf',
                    'wor': [{
                    'I': 'love'
                    }, {}, [{
                    'json': 4
                    }]]
                }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, [{
            'I': 'love'
            }, {}, [{
            'json': 4
            }]], {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'another': 'obf',
            'wor': [{
                'I': 'love'
            }, {}, [{
                'json': 4
            }]]
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, [{
            'I': 'love'
            }, {}, [{
            'json': 4
            }]], {
            'hello': 'world',
            'ge': {
                'another': 'obf',
                'wor': [{
                'I': 'love'
                }, {}, [{
                'json': 4
                }]]
            }
            }, {
                'another': 'obf',
                'wor': [
                    {
                        'I': 'love'
                    }, 
                    {}, 
                    [{
                        'json': 4
                    }]
                ]
            }, [
                {
                    'I': 'love'
                }, 
                {}, 
                [
                    {
                        'json': 4
                    }
                ]
            ], {
                'hello': 'world',
                'ge': {
                    'another': 'obf',
                    'wor': [
                        {
                            'I': 'love'
                        }, 
                        {}, 
                        [{
                            'json': 4
                        }]
                    ]
                }
            }, {
                'another': 'obf',
                'wor': [
                    {
                        'I': 'love'
                    }, 
                    {}, 
                    [{
                        'json': 4
                    }]
                ]
            }
        ]
    ],
    [
        "Bracket-delimitated object with nested objects and arrays",
        `
{\
"objects": [\
{ "from": 44, "my_ref": "http://192.168.10.1/index.php", "allow": "no", "to": 10 },\
{ "from": 20, "my_ref": "http://192.168.10.2/index.php", "allow": "mandatory", "to": 0 }\
],\
"comment": "My PHP",\
"identifiable_with_user": true,\
"key": 10,\
"link": [\
{ "href": "http://192.168.10.1/index.php", "method": "GET", "rel": "self", "type": "website" },\
{ "href": "http://192.168.10.5/identifiable.php", "method": "GET", "rel": "account_info" }\
],\
"name": "Accounts",\
"read_only": true,\
"system": true,\
"system_key": 20,\
"tls_match_ref": "http://192.168.10.5/accounts.php"\
}
        `,
        [
            {
                "objects": [
                    { "from": 44, "my_ref": "http://192.168.10.1/index.php", "allow": "no", "to": 10 },
                    { "from": 20, "my_ref": "http://192.168.10.2/index.php", "allow": "mandatory", "to": 0 }
                ],
                "comment": "My PHP",
                "identifiable_with_user": true,
                "key": 10,
                "link": [
                    { "href": "http://192.168.10.1/index.php", "method": "GET", "rel": "self", "type": "website" },
                    { "href": "http://192.168.10.5/identifiable.php", "method": "GET", "rel": "account_info" }
                ],
                "name": "Accounts",
                "read_only": true,
                "system": true,
                "system_key": 20,
                "tls_match_ref": "http://192.168.10.5/accounts.php"
            }
        ]
    ],
    [
        "Location bed nested array",
        `
        {
"locations": [
{
"location_id": 4,
"location_name": "string",
"buildings": [
{
"building_name": "string",
"rooms": [
{
"room_name": "string",
"beds": [
{
"bed_name": "string",
"enabled": "string",
"status": "string",
"gender": "string",
"gender_identity": "string",
"casefile_id": "string",
"first_name": "string",
"last_name": "string",
"admission_date": "string",
"anticipated_discharge_date": "string",
"dob": "string",
"level_of_care": "string",
"program": "string"
}]}]}]}]}
        `,
        [
            {
                'locations': [
                    {
                        'location_id': 4, 
                        'location_name': 'string', 
                        'buildings': [
                            {
                                'building_name': 'string', 
                                'rooms': [
                                    {
                                        'room_name': 'string', 
                                        'beds': [
                                            {
                                                'bed_name': 'string', 
                                                'enabled': 'string', 
                                                'status': 'string', 
                                                'gender': 'string', 
                                                'gender_identity': 'string', 
                                                'casefile_id': 'string', 
                                                'first_name': 'string', 
                                                'last_name': 'string', 
                                                'admission_date': 'string', 
                                                'anticipated_discharge_date': 'string', 
                                                'dob': 'string', 
                                                'level_of_care': 'string', 
                                                'program': 'string'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    ]
]