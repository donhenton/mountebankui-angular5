// tslint:disable:max-line-length
export  class TestHarness {


 getHarness() {
     return harness;
 }

// comparisions are always on UNFORMATTED JSON strings
 stringify(obj) {
     return JSON.stringify(obj);
 }



 getEditDistance(a: string, b: string) {
     // console.log(`a ${(typeof a)}`);
    if (a.length === 0) { return b.length; }
    if (b.length === 0) { return a.length; }

    const matrix = [];

    // increment along the first column of each row
    let i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    let j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                  Math.min(matrix[i][j - 1] + 1, // insertion
                                           matrix[i - 1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }


}

const _harness = new TestHarness() ;
export default _harness;





const harness: any = {};

harness.imposterCollection =
        [
            {
                'port': '9000',
                'id': 0,
                'description': 'Restaurant Collection (9000)',
                'imposters': [
                    {
                        'responses': [
                            {
                                'status': '500',
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'text/html'
                                    }
                                ],

                                'body': '<h1>Server Error</h3>\n\n<p><em>Cannot use this endpoint for anything except restaurant queries</em></p>',
                                'decorate': 'function(res,rep) {var x= \'get a  job\';}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': 'path'
                            },
                            'injection': {
                                'use': true,
                                'body': 'function(request, logger) {\n    var isNotRestaurant = false;\n    if (request.path.indexOf(\'/restaurant\') !== 0) {\n        isNotRestaurant = true;\n    }\n    return isNotRestaurant;\n}'
                            },
                            'verb': 'GET',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'application/json'
                                    }
                                ],
                                'body': '[\n  {\n    "name": "Huddle House",\n    "zipCode": "30701",\n    "city": "Calhoun",\n    "state": "GA",\n    "version": 1,\n    "id": 1,\n    "reviewDTOs": [\n      {\n        "starRating": 3,\n        "reviewListing": "A real gas",\n        "stampDate": 1422964478318,\n        "id": 10\n      },\n      {\n        "starRating": 4,\n        "reviewListing": "Can you say \\"gastric bypass\\"?",\n        "stampDate": 1422964478318,\n        "id": 11\n      }\n    ]\n  },\n  {\n    "name": "John Browne\'s Pub & Eatery",\n    "zipCode": "46235",\n    "city": "Indianapolis",\n    "state": "IN",\n    "version": 1,\n    "id": 3,\n    "reviewDTOs": [\n      {\n        "starRating": 2,\n        "reviewListing": "Impeccable service!",\n        "stampDate": 1422964478318,\n        "id": 12\n      }\n    ]\n  },\n  {\n    "name": "Ling\'s Express",\n    "zipCode": "53217",\n    "city": "Milwaukee",\n    "state": "WI",\n    "version": 1,\n    "id": 2,\n    "reviewDTOs": [\n      {\n        "starRating": 6,\n        "reviewListing": "Consider suicide first",\n        "stampDate": 1422964478318,\n        "id": 14\n      },\n      {\n        "starRating": 1,\n        "reviewListing": "Impeccable service!",\n        "stampDate": 1422964478318,\n        "id": 13\n      },\n      {\n        "starRating": 4,\n        "reviewListing": "A root canal would be better",\n        "stampDate": 1422964478318,\n        "id": 15\n      }\n    ]\n  }\n]'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'GET',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'application/json'
                                    }
                                ],
                                'body': '{\n        "name": "Huddle House",\n        "zipCode": "30701",\n        "city": "Calhoun",\n        "state": "GA",\n        "version": 1,\n        "id": 1,\n        "reviewDTOs": [{\n                "starRating": 3,\n                "reviewListing": "A real gas",\n                "stampDate": 1422964478318,\n                "id": 10\n            }, {\n                "starRating": 4,\n                "reviewListing": "Can you say \\"gastric bypass\\"?",\n                "stampDate": 1422964478318,\n                "id": 11\n            }]\n    }'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant/1'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'GET',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'application/json'
                                    }
                                ],
                                'body': '{\n        "name": "John Browne\'s Pub & Eatery",\n        "zipCode": "46235",\n        "city": "Indianapolis",\n        "state": "IN",\n        "version": 1,\n        "id": 3,\n        "reviewDTOs": [{\n                "starRating": 2,\n                "reviewListing": "Impeccable service!",\n                "stampDate": 1422964478318,\n                "id": 12\n            }]\n    }'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant/2'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'GET',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': '404',
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'application/json'
                                    }
                                ],
                                'body': '{"error": "Item not found"}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'contains',
                                'value': '/restaurant/'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'GET',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'application/json;charset=UTF-8'
                                    }
                                ],
                                'body': '{\n  "id": 52\n}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'POST',
                            'headers': [
                                {
                                    'key': 'Content-Type',
                                    'value': 'application/json'
                                }
                            ],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': '{"name":"martins mania","zipCode":"53217","city":"Bonaroo","state":"WI","version":1}'
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': '500',
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [],
                                'body': '{\n  "message": "restaurant add failed",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceException"\n}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'POST',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'not equals',
                                'body': '{"name":"martins mania","zipCode":"53217","city":"Bonaroo","state":"WI","version":1}'
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': '500',
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [],
                                'body': '{\n  "message": "for restaurant posting only",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceException"\n}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'POST',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': '404',
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [
                                    {
                                        'key': 'Content-Type',
                                        'value': 'application/json;charset=UTF-8'
                                    }
                                ],
                                'body': '{\n  "message": "cannot find restaurant with given key",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceNotFoundException"\n}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'not equals',
                                'value': '/restaurant/1'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'DELETE',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [],
                                'body': ''
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant/1'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'DELETE',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [],
                                'body': '{"message": "successful update"}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/restaurant/1'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'PUT',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'contains',
                                'body': '{"name":"martins mania","zipCode":"53217","city":"Bonaroo","state":"WI","version":1}'
                            }
                        }
                    },
                    {
                        'responses': [
                            {
                                'status': '500',
                                'injection': {
                                    'use': false,
                                    'body': ''
                                },
                                'headers': [],
                                'body': '{\n  "message": "update failed",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceException"\n}'
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'not equals',
                                'value': '/restraurant/1'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'PUT',
                            'headers': [],
                            'query_params': [],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    }
                ]
            },
            {
                'port': '9500',
                'id': 1,
                'description': 'Imposters Using Injection (9500)',
                'imposters': [
                    {
                        'responses': [
                            {
                                'status': 200,
                                'injection': {
                                    'use': true,
                                    'body': 'function processRequest(request, state, logger) {\n\n\n    var handlebars = require(\'handlebars\');\n    var JSON = require("JSON3")\n    var sentIn = JSON.stringify(request, null);\n    // logger.info(\'sentIn \' + sentIn);\n    var source = \'{"book": "{{title}}","publication": {{year}}, "ISBN": "{{random}}" }\';\n    var ran = Math.floor(1053 + Math.random() * 124 + .5) + "-ADGJK-" + Math.floor(1057 + Math.random() * 124 + .5)\n\n    var data = {\n        "title": "Anne of Green Gables",\n        "year": 1985,\n        "random": ran\n    };\n\n    var template = handlebars.compile(source);\n    var textJSON = template(data);\n\n    return {\n        headers: {\n            \'Content-Type\': \'application/json\'\n        },\n        body: textJSON,\n        statusCode: 200\n    };\n}'
                                },
                                'headers': [],
                                'body': ''
                            },
                            {
                                'status': 200,
                                'injection': {
                                    'use': true,
                                    'body': 'function processRequest(request, state, logger) {\n\n\n    var handlebars = require(\'handlebars\');\n    var JSON = require("JSON3")\n    var sentIn = JSON.stringify(request, null);\n    //logger.info(\'sentIn \' + sentIn);\n    var source = \'{"book": "{{title}}","publication": {{year}}, "ISBN": "{{random}}" }\';\n    var ran = Math.floor(1053 + Math.random() * 124 + .5) + "-BONZO-" + Math.floor(1057 + Math.random() * 124 + .5)\n\n    var data = {\n        "title": "Jabberwocky",\n        "year": 1888,\n        "random": ran\n    };\n\n    var template = handlebars.compile(source);\n    var textJSON = template(data);\n\n    return {\n        headers: {\n            \'Content-Type\': \'application/json\'\n        },\n        body: textJSON,\n        statusCode: 200\n    };\n}'
                                },
                                'headers': [],
                                'body': ''
                            }
                        ],
                        'match': {
                            'path_match': {
                                'type': 'equals',
                                'value': '/inject'
                            },
                            'injection': {
                                'use': false,
                                'body': ''
                            },
                            'verb': 'GET',
                            'headers': [],
                            'query_params': [
                                {
                                    'key': 'alpha',
                                    'value': '100'
                                }
                            ],
                            'body_match': {
                                'type': 'equals',
                                'body': ''
                            }
                        }
                    }
                ]
            }
        ];

// ====================== end imposter collection =============================

harness.expected = [];

harness.expected.push(
        {
            'port': '9000',
            'protocol': 'http',
            'stubs': [
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'text/html'
                                },
                                'statusCode': '500',
                                'body': '<h1>Server Error</h1>\n\n<p><em>Cannot use this endpoint for anything except restaurant queries</em></p>'
                            },
                            '_behaviors': {
                                'decorate': 'function(res,rep) {var x= \'get a  job\';}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'inject': 'function(request, logger) {\n    var isNotRestaurant = false;\n    if (request.path.indexOf(\'/restaurant\') !== 0) {\n        isNotRestaurant = true;\n    }\n    return isNotRestaurant;\n}'
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'statusCode': 200,
                                'body': '[\n  {\n    "name": "Huddle House",\n    "zipCode": "30701",\n    "city": "Calhoun",\n    "state": "GA",\n    "version": 1,\n    "id": 1,\n    "reviewDTOs": [\n      {\n        "starRating": 3,\n        "reviewListing": "A real gas",\n        "stampDate": 1422964478318,\n        "id": 10\n      },\n      {\n        "starRating": 4,\n        "reviewListing": "Can you say \\"gastric bypass\\"?",\n        "stampDate": 1422964478318,\n        "id": 11\n      }\n    ]\n  },\n  {\n    "name": "John Browne\'s Pub & Eatery",\n    "zipCode": "46235",\n    "city": "Indianapolis",\n    "state": "IN",\n    "version": 1,\n    "id": 3,\n    "reviewDTOs": [\n      {\n        "starRating": 2,\n        "reviewListing": "Impeccable service!",\n        "stampDate": 1422964478318,\n        "id": 12\n      }\n    ]\n  },\n  {\n    "name": "Ling\'s Express",\n    "zipCode": "53217",\n    "city": "Milwaukee",\n    "state": "WI",\n    "version": 1,\n    "id": 2,\n    "reviewDTOs": [\n      {\n        "starRating": 6,\n        "reviewListing": "Consider suicide first",\n        "stampDate": 1422964478318,\n        "id": 14\n      },\n      {\n        "starRating": 1,\n        "reviewListing": "Impeccable service!",\n        "stampDate": 1422964478318,\n        "id": 13\n      },\n      {\n        "starRating": 4,\n        "reviewListing": "A root canal would be better",\n        "stampDate": 1422964478318,\n        "id": 15\n      }\n    ]\n  }\n]'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'GET'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'statusCode': 200,
                                'body': '{\n        "name": "Huddle House",\n        "zipCode": "30701",\n        "city": "Calhoun",\n        "state": "GA",\n        "version": 1,\n        "id": 1,\n        "reviewDTOs": [{\n                "starRating": 3,\n                "reviewListing": "A real gas",\n                "stampDate": 1422964478318,\n                "id": 10\n            }, {\n                "starRating": 4,\n                "reviewListing": "Can you say \\"gastric bypass\\"?",\n                "stampDate": 1422964478318,\n                "id": 11\n            }]\n    }'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'GET'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant/1'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'statusCode': 200,
                                'body': '{\n        "name": "John Browne\'s Pub & Eatery",\n        "zipCode": "46235",\n        "city": "Indianapolis",\n        "state": "IN",\n        "version": 1,\n        "id": 3,\n        "reviewDTOs": [{\n                "starRating": 2,\n                "reviewListing": "Impeccable service!",\n                "stampDate": 1422964478318,\n                "id": 12\n            }]\n    }'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'GET'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant/2'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'statusCode': '404',
                                'body': '{"error": "Item not found"}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'GET'
                                    }
                                },
                                {
                                    'contains': {
                                        'path': '/restaurant/'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                },
                                'statusCode': 200,
                                'body': '{\n  "id": 52\n}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'POST'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant'
                                    }
                                },
                                {
                                    'equals': {
                                        'body': '{"name":"martins mania","zipCode":"53217","city":"Bonaroo","state":"WI","version":1}'
                                    }
                                },
                                {
                                    'equals': {
                                        'headers': {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'statusCode': '500',
                                'body': '{\n  "message": "restaurant add failed",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceException"\n}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'POST'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant'
                                    }
                                },
                                {
                                    'not': {
                                        'equals': {
                                            'body': '{"name":"martins mania","zipCode":"53217","city":"Bonaroo","state":"WI","version":1}'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'statusCode': '500',
                                'body': '{\n  "message": "for restaurant posting only",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceException"\n}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'POST'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'headers': {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                },
                                'statusCode': '404',
                                'body': '{\n  "message": "cannot find restaurant with given key",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceNotFoundException"\n}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'DELETE'
                                    }
                                },
                                {
                                    'not': {
                                        'equals': {
                                            'path': '/restaurant/1'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'statusCode': 200
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'DELETE'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant/1'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'statusCode': 200,
                                'body': '{"message": "successful update"}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'PUT'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/restaurant/1'
                                    }
                                },
                                {
                                    'contains': {
                                        'body': '{"name":"martins mania","zipCode":"53217","city":"Bonaroo","state":"WI","version":1}'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    'responses': [
                        {
                            'is': {
                                'statusCode': '500',
                                'body': '{\n  "message": "update failed",\n  "errorClass": "com.dhenton9000.spring.mvc.controllers.ResourceException"\n}'
                            }
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'PUT'
                                    }
                                },
                                {
                                    'not': {
                                        'equals': {
                                            'path': '/restraurant/1'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }




); // end push expected[0];


harness.expected.push(
        {
            'port': '9500',
            'protocol': 'http',
            'stubs': [
                {
                    'responses': [
                        {
                            'inject': 'function processRequest(request, state, logger) {\n\n\n    var handlebars = require(\'handlebars\');\n    var JSON = require("JSON3")\n    var sentIn = JSON.stringify(request, null);\n    // logger.info(\'sentIn \' + sentIn);\n    var source = \'{"book": "{{title}}","publication": {{year}}, "ISBN": "{{random}}" }\';\n    var ran = Math.floor(1053 + Math.random() * 124 + .5) + "-ADGJK-" + Math.floor(1057 + Math.random() * 124 + .5)\n\n    var data = {\n        "title": "Anne of Green Gables",\n        "year": 1985,\n        "random": ran\n    };\n\n    var template = handlebars.compile(source);\n    var textJSON = template(data);\n\n    return {\n        headers: {\n            \'Content-Type\': \'application/json\'\n        },\n        body: textJSON,\n        statusCode: 200\n    };\n}'
                        },
                        {
                            'inject': 'function processRequest(request, state, logger) {\n\n\n    var handlebars = require(\'handlebars\');\n    var JSON = require("JSON3")\n    var sentIn = JSON.stringify(request, null);\n    //logger.info(\'sentIn \' + sentIn);\n    var source = \'{"book": "{{title}}","publication": {{year}}, "ISBN": "{{random}}" }\';\n    var ran = Math.floor(1053 + Math.random() * 124 + .5) + "-BONZO-" + Math.floor(1057 + Math.random() * 124 + .5)\n\n    var data = {\n        "title": "Jabberwocky",\n        "year": 1888,\n        "random": ran\n    };\n\n    var template = handlebars.compile(source);\n    var textJSON = template(data);\n\n    return {\n        headers: {\n            \'Content-Type\': \'application/json\'\n        },\n        body: textJSON,\n        statusCode: 200\n    };\n}'
                        }
                    ],
                    'predicates': [
                        {
                            'and': [
                                {
                                    'equals': {
                                        'method': 'GET'
                                    }
                                },
                                {
                                    'equals': {
                                        'path': '/inject'
                                    }
                                },
                                {
                                    'deepEquals': {
                                        'query': {
                                            'alpha': '100'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }


); // end push expected[1]


harness.imposterTest = {'newCollection': {}};
harness.imposterTest.newCollection = [
    {
        'port': 9999,
        'useCORs': false,
        'CORsOrigin': 'http://localhost:8383',
        'allowedCORsHeaders': 'application/json,Content-Type',
        'allowedCORsMethods': 'GET,POST,PUT,PATCH,DELETE',
        'id': 0,
        'description': 'New Imposter Description 0',
        'imposters': [
            {
                'responses': [
                    {
                        'status': 200,
                        'injection': {
                            'use': false,
                            'body': ''
                        },
                        'headers': [],
                        'body': ''
                    }
                ],
                'match': {
                    'path_match': {
                        'type': 'equals',
                        'value': 'path'
                    },
                    'injection': {
                        'use': false,
                        'body': ''
                    },
                    'verb': 'GET',
                    'headers': [],
                    'query_params': [],
                    'body_match': {
                        'type': 'equals',
                        'body': ''
                    }
                }
            }
        ]
    }
];



